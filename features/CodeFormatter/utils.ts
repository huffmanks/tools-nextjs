export type CodeFormat = "plaintext" | "json" | "html" | "css" | "js";

export function detectFormat(input: string): CodeFormat {
  const code = input.trim();
  if (!code) return "plaintext";

  try {
    JSON.parse(code);
    return "json";
  } catch {}

  const isHtml =
    /^<!doctype\s+html/i.test(code) ||
    /^<html[\s>]/i.test(code) ||
    /<\/?[a-z][a-z0-9-]*(?:\s+[\w-]+(?:=("[^"]*"|'[^']*'|[^\s>]+))?)*\s*\/?>/i.test(code);
  if (isHtml) return "html";

  const cssRuleRe = /(^|\})\s*[.#a-zA-Z][^{};]*\{[^}]*\}/m;
  if (cssRuleRe.test(code)) {
    const looksLikeJs = /\b(function|=>|const\s+\w+\s*=|class\s+\w+)\b/.test(code);
    const propertyLines = (code.match(/[\w-]+\s*:\s*[^;{}]+;/g) || []).length;
    if (!looksLikeJs && propertyLines > 0) return "css";
  }

  if (scoreJavaScript(code) >= 3) return "js";

  return "plaintext";
}

function scoreJavaScript(code: string): number {
  let score = 0;

  const strongSignals = [
    /=>\s*\{?/,
    /\bfunction\s*\*?\s*\w*\s*\(/,
    /\b(const|let|var)\s+\w+\s*=/,
    /\bclass\s+\w+/,
    /\bimport\s+.+\s+from\s+['"]/,
    /\bexport\s+(default\s+)?(function|class|const|let|var)\b/,
    /console\.(log|warn|error|info)\(/,
    /\.then\(|\.catch\(|\basync\s+function|\bawait\s+/,
    /===|!==/,
    /`[^`]*\$\{[^}]*\}[^`]*`/,
  ];

  const weakSignals = [/\breturn\b/, /\bif\s*\(/, /\}\s*else\s*\{/, /\bnew\s+\w+\(/, /;\s*$/m];

  for (const re of strongSignals) if (re.test(code)) score += 2;
  for (const re of weakSignals) if (re.test(code)) score += 1;

  if (/\{[\s\S]*\}/.test(code)) score += 1;
  if (/\([\s\S]*\)/.test(code)) score += 1;

  const sentenceLike = (code.match(/[a-z]\.\s+[A-Z]/g) || []).length;
  const codePunct = (code.match(/[{}();=]/g) || []).length;
  if (sentenceLike > 0 && codePunct < 3) score -= 3;

  return score;
}

interface TransformerParams {
  codeInput: string;
  format: string;
  action: string;
}

export const codeTransformer = ({ codeInput, format, action }: TransformerParams): string => {
  if (!codeInput || !/\S/.test(codeInput)) return "";

  if (action === "encode") return encodeURIComponent(codeInput);
  if (action === "decode") {
    try {
      return decodeURIComponent(codeInput);
    } catch {
      return codeInput;
    }
  }

  if (action === "stringify") return JSON.stringify(codeInput);
  if (action === "un-stringify") {
    try {
      const parsed = JSON.parse(codeInput);
      return typeof parsed === "string" ? parsed : JSON.stringify(parsed, null, 2);
    } catch {
      return codeInput;
    }
  }

  if (action === "minify") {
    return handleMinification({ codeInput, format });
  }

  if (action === "un-minify") {
    return handleBeautify({ codeInput, format });
  }

  return codeInput;
};

function extractProtected(code: string, patterns: RegExp[]) {
  const store = [];
  let out = code;
  for (const re of patterns) {
    out = out.replace(re, (match) => {
      const token = `\u0000${store.length}\u0000`;
      store.push(match);
      return token;
    });
  }
  return {
    code: out,
    restore: (str: string) => str.replace(/\u0000(\d+)\u0000/g, (_, i) => store[Number(i)]),
  };
}

const JS_PROTECT_PATTERNS = [
  /\/\*[\s\S]*?\*\//g,
  /\/\/.*/g,
  /`(?:\\.|\$\{[^{}]*\}|[^`\\])*`/g,
  /"(?:\\.|[^"\\])*"/g,
  /'(?:\\.|[^'\\])*'/g,
];

const CSS_PROTECT_PATTERNS = [/\/\*[\s\S]*?\*\//g, /"(?:\\.|[^"\\])*"/g, /'(?:\\.|[^'\\])*'/g];

function safePlusMinusSpacing(str: string): string {
  return str.replace(/\s*([+\-](?:\s*[+\-])*)\s*/g, (_, run) => (/\s/.test(run) ? run.replace(/\s+/g, " ") : run));
}

function tryParseJson(code: string): { ok: boolean; value: any } {
  try {
    return { ok: true, value: JSON.parse(code) };
  } catch {}

  const repaired = code
    .replace(/,\s*([}\]])/g, "$1")
    .replace(/'((?:\\.|[^'\\])*)'/g, '"$1"')
    .replace(/([{,]\s*)([A-Za-z_$][\w$]*)\s*:/g, '$1"$2":');

  try {
    return { ok: true, value: JSON.parse(repaired) };
  } catch {
    return { ok: false, value: null };
  }
}

const handleMinification = ({ codeInput, format }: { codeInput: string; format: string }) => {
  const code = codeInput.trim();
  if (!code) return code;

  switch (format) {
    case "json": {
      const { ok, value } = tryParseJson(code);
      if (!ok) return code;
      return JSON.stringify(value);
    }

    case "css": {
      const { code: safe, restore } = extractProtected(code, CSS_PROTECT_PATTERNS);
      const minified = safe
        .replace(/\s*([{}:;,>+~])\s*/g, "$1")
        .replace(/\s+/g, " ")
        .replace(/;}/g, "}")
        .trim();
      return restore(minified);
    }

    case "html": {
      const { code: safe, restore } = extractProtected(code, [/<!--[\s\S]*?-->/g]);
      const minified = safe.replace(/>\s+</g, "><").replace(/\s+/g, " ").trim();
      return restore(minified);
    }

    case "js": {
      const { code: safe, restore } = extractProtected(code, JS_PROTECT_PATTERNS);
      let minified = safe.replace(/\n/g, " ").replace(/\s*([=\/*%&|^<>!?,;:{}()[\].])\s*/g, "$1");
      minified = safePlusMinusSpacing(minified);
      minified = minified.replace(/\s+/g, " ").trim();
      return restore(minified);
    }

    case "plaintext":
    default:
      return code.replace(/\s+/g, " ").trim();
  }
};

const handleBeautify = ({ codeInput, format }: { codeInput: string; format: string }) => {
  const code = codeInput.trim();
  if (!code) return code;

  if (format === "json") {
    const { ok, value } = tryParseJson(code);
    if (!ok) return code;
    return JSON.stringify(value, null, 2);
  }

  let indentLevel = 0;
  const indent = () => "  ".repeat(indentLevel);

  if (format === "css") {
    const clean = handleMinification({ codeInput: code, format: "css" });
    const { code: safe, restore } = extractProtected(clean, CSS_PROTECT_PATTERNS);

    const expanded = safe.replace(/\{/g, " {\n").replace(/\}/g, "\n}\n").replace(/;/g, ";\n");

    const lines = expanded
      .split("\n")
      .map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return "";

        if (trimmed.endsWith("}") || trimmed === "}") {
          indentLevel = Math.max(0, indentLevel - 1);
        }

        let formatted = trimmed;
        if (!trimmed.endsWith("{") && trimmed !== "}") {
          formatted = trimmed.replace(/^([\w-]+)\s*:\s*/, "$1: ");
          if (!formatted.endsWith(";")) formatted += ";";
        }

        const withIndent = indent() + formatted;

        if (trimmed.endsWith("{")) indentLevel++;
        return withIndent;
      })
      .join("\n")
      .replace(/\n{2,}/g, "\n");

    return restore(lines);
  }

  if (format === "js") {
    const { code: safe, restore } = extractProtected(code, JS_PROTECT_PATTERNS);

    const spaced = safe
      .replace(/,(?!\s|$)/g, ", ")
      .replace(/(?<!:):(?!:)(?!\s)/g, ": ")
      .replace(/(?<![=!<>+\-*/%&|^])=(?![=>])/g, " = ")
      .replace(/\s+/g, " ");

    const expanded = spaced
      .replace(/\{/g, " {\n")
      .replace(/\}/g, "\n}\n")
      .replace(/;/g, ";\n")
      .replace(/\n\s*\n/g, "\n")
      .replace(/\n[ \t]*;/g, ";")
      .replace(/[ \t]{2,}/g, " ");

    const lines = expanded
      .split("\n")
      .map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return "";

        if (trimmed.startsWith("}")) {
          indentLevel = Math.max(0, indentLevel - 1);
        }

        const formatted = indent() + trimmed;

        if (trimmed.endsWith("{")) indentLevel++;
        return formatted;
      })
      .join("\n");

    return restore(lines);
  }

  if (format === "html") {
    const { code: safe, restore } = extractProtected(code, [/<!--[\s\S]*?-->/g]);
    const withBreaks = safe.replace(/>\s*</g, ">\n<").trim();
    const voidTags = new Set([
      "area",
      "base",
      "br",
      "col",
      "embed",
      "hr",
      "img",
      "input",
      "link",
      "meta",
      "param",
      "source",
      "track",
      "wbr",
    ]);

    const lines = withBreaks
      .split("\n")
      .map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return "";

        const closingTag = /^<\/([a-zA-Z0-9-]+)/.exec(trimmed);
        const openingTag = /^<([a-zA-Z0-9-]+)/.exec(trimmed);
        const isSelfClosing = /\/>\s*$/.test(trimmed) || (openingTag && voidTags.has(openingTag[1].toLowerCase()));
        const isFullTagOnOneLine = openingTag && new RegExp(`</${openingTag[1]}>\\s*$`, "i").test(trimmed);

        if (closingTag) indentLevel = Math.max(0, indentLevel - 1);

        const formatted = indent() + trimmed;

        if (openingTag && !isSelfClosing && !isFullTagOnOneLine && !closingTag) {
          indentLevel++;
        }

        return formatted;
      })
      .join("\n");

    return restore(lines);
  }

  if (format === "plaintext") {
    return code
      .split("\n")
      .map((l) => l.trimEnd())
      .join("\n")
      .replace(/\n{3,}/g, "\n\n");
  }

  return code;
};
