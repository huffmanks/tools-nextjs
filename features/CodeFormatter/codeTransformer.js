export function detectFormat(input) {
  const code = input.trim();
  if (!code) return "plaintext";

  try {
    JSON.parse(code);
    return "json";
  } catch {}

  if ((code.startsWith("{") && code.endsWith("}")) || (code.startsWith("[") && code.endsWith("]"))) {
    if (code.includes('"') && code.includes(":") && !code.includes(";")) {
      return "json";
    }
  }

  const isHtml =
    /^<!doctype/i.test(code) ||
    /^<html/i.test(code) ||
    /<[a-z0-9-]+(?:\s[^>]*)?>/i.test(code) ||
    /<\/[a-z0-9-]+>/i.test(code) ||
    /&[a-z0-9#]+;/i.test(code);

  if (isHtml) return "html";

  const hasCssBlocks = /^[.#a-zA-Z0-9_*:,>\s-]+\{[\s\S]*?\}/m.test(code);
  if (hasCssBlocks) {
    const propertiesMatch = /[\w-]+\s*:\s*[^;}\n]+[;}]/.test(code);
    const hasJsKeywords = /\b(const|let|var|function|return|export|import)\b/.test(code);
    if (propertiesMatch && !hasJsKeywords && !code.includes("=>")) {
      return "css";
    }
  }

  const jsKeywords =
    /\b(import|export|const|let|var|function|class|return|async|await|interface|type|enum|console\.log)\b/;
  const jsOperators = /=>|\(.*?\)\s*=>|\bif\s*\(|\}\s*else\s*\{/;
  if (jsKeywords.test(code) || jsOperators.test(code)) {
    return "js";
  }

  return "plaintext";
}

export const codeTransformer = ({ codeInput, format, action }) => {
  if (!codeInput || !/\S/.test(codeInput)) return "";

  if (action === "encode") return encodeURIComponent(codeInput);
  if (action === "decode") return decodeURIComponent(codeInput);

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

const handleMinification = ({ codeInput, format }) => {
  const code = codeInput.trim();

  switch (format) {
    case "json":
      return JSON.stringify(JSON.parse(code));
    case "css":
      return code
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s*([\{\}:;,>+~])\s*/g, "$1")
        .replace(/\s+/g, " ")
        .replace(/;}/g, "}");
    case "html":
      return code
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/>\s+</g, "><")
        .replace(/\s+/g, " ");
    case "js":
      return code
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\/\/.*/g, "")
        .replace(/\n/g, " ")
        .replace(/\s*([=+\-\/*%&|^<>!?,;:{}\(\)\[\]])\s*/g, "$1")
        .replace(/\s+/g, " ");
    default:
      return code;
  }
};

const handleBeautify = ({ codeInput, format }) => {
  const code = codeInput.trim();
  if (format === "json") {
    return JSON.stringify(JSON.parse(code), null, 2);
  }

  let indentLevel = 0;
  const indent = () => "  ".repeat(indentLevel);

  if (format === "css") {
    const clean = handleMinification({ codeInput: code, format: "css" });
    return clean
      .replace(/\{/g, " {\n")
      .replace(/\}/g, "\n}\n")
      .replace(/;/g, ";\n")
      .split("\n")
      .map((line) => {
        const trimmed = line.trim();
        if (trimmed.endsWith("}")) indentLevel = Math.max(0, indentLevel - 1);
        const formatted = trimmed ? indent() + trimmed : "";
        if (trimmed.endsWith("{")) indentLevel++;
        return formatted;
      })
      .join("\n")
      .replace(/\n\s*\n/g, "\n");
  }

  if (format === "js") {
    return code
      .replace(/\{/g, " {\n")
      .replace(/\}/g, "\n}\n")
      .replace(/;/g, ";\n")
      .replace(/\n\s*\n/g, "\n")
      .split("\n")
      .map((line) => {
        let trimmed = line.trim();
        if (trimmed.startsWith("}")) indentLevel = Math.max(0, indentLevel - 1);
        const formatted = trimmed ? indent() + trimmed : "";
        if (trimmed.endsWith("{")) indentLevel++;
        return formatted;
      })
      .join("\n");
  }

  return code;
};
