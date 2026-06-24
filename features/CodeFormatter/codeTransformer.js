export const codeTransformer = ({ codeInput, format, action }) => {
  if (!codeInput || !/\S/.test(codeInput)) return "";

  if (action === "urlEncode") return encodeURIComponent(codeInput);
  if (action === "urlDecode") return decodeURIComponent(codeInput);

  if (action === "stringify") return JSON.stringify(codeInput);
  if (action === "unstringify") {
    const parsed = JSON.parse(codeInput);
    return typeof parsed === "string" ? parsed : JSON.stringify(parsed, null, 2);
  }

  if (action === "minify") {
    return handleMinification({ codeInput, format });
  }

  if (action === "unminify") {
    return handleBeautify({ codeInput, format });
  }

  return codeInput;
};

const handleMinification = ({ codeInput, format }) => {
  switch (format) {
    case "json":
      return JSON.stringify(JSON.parse(codeInput));
    case "css":
      return codeInput
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s*([{\}:;,])\s*/g, "$1")
        .replace(/\s+/g, " ")
        .trim();
    case "html":
      return codeInput;
      replace(/\//g, "").replace(/>\s+</g, "><").replace(/\s+/g, " ").trim();
    case "js":
      return codeInput
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\/\/.*/g, "")
        .replace(/\s+/g, " ")
        .trim();
    default:
      return codeInput;
  }
};

const handleBeautify = ({ codeInput, format }) => {
  if (format === "json") {
    return JSON.stringify(JSON.parse(codeInput), null, 2);
  }

  if (format === "css" || format === "js") {
    return (
      codeInput
        .replace(/\{/g, " {\n  ")
        .replace(/\}/g, "\n}\n")
        .replace(/;/g, ";\n  ")
        .replace(/\n\s*\n/g, "\n")
        .body?.trim() || codeInput
    );
  }
  return codeInput;
};
