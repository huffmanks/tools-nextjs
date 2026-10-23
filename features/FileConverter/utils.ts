import XMLBuilder from "fast-xml-builder";
import { XMLParser } from "fast-xml-parser";
import { SyntaxValidator } from "fast-xml-validator";
import * as yaml from "js-yaml";
import * as toml from "smol-toml";
import * as XLSX from "xlsx";

import {
  type ConversionOptions,
  type ConversionResult,
  type ConversionWarning,
  type DataRecord,
  FORMAT_IDS,
  FileConversionError,
  type FormatDefinition,
  type FormatDetection,
  type FormatId,
  type InputPayload,
  type JsonValue,
  type NormalizedData,
  type TableData,
} from "@/features/FileConverter/types";

export const FORMAT_REGISTRY: Record<FormatId, FormatDefinition> = {
  csv: {
    id: "csv",
    label: "CSV",
    extensions: [".csv"],
    mimeType: "text/csv;charset=utf-8",
    binary: false,
  },
  tsv: {
    id: "tsv",
    label: "TSV",
    extensions: [".tsv"],
    mimeType: "text/tab-separated-values;charset=utf-8",
    binary: false,
  },
  xlsx: {
    id: "xlsx",
    label: "Excel workbook",
    extensions: [".xlsx"],
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    binary: true,
  },
  xml: {
    id: "xml",
    label: "XML",
    extensions: [".xml"],
    mimeType: "application/xml;charset=utf-8",
    binary: false,
  },
  json: {
    id: "json",
    label: "JSON",
    extensions: [".json"],
    mimeType: "application/json;charset=utf-8",
    binary: false,
  },
  "markdown-table": {
    id: "markdown-table",
    label: "Markdown table",
    extensions: [".md", ".markdown"],
    mimeType: "text/markdown;charset=utf-8",
    binary: false,
  },
  "html-table": {
    id: "html-table",
    label: "HTML table",
    extensions: [".html", ".htm"],
    mimeType: "text/html;charset=utf-8",
    binary: false,
  },
  toml: {
    id: "toml",
    label: "TOML",
    extensions: [".toml"],
    mimeType: "application/toml;charset=utf-8",
    binary: false,
  },
  yaml: {
    id: "yaml",
    label: "YAML",
    extensions: [".yaml", ".yml"],
    mimeType: "application/yaml;charset=utf-8",
    binary: false,
  },
};

const MAX_INPUT_BYTES = 20 * 1024 * 1024;
const XML_PARSER_OPTIONS = {
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  parseTagValue: false,
  trimValues: false,
};
const XML_BUILDER_OPTIONS = {
  format: true,
  indentBy: "  ",
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  suppressEmptyNode: false,
};

function fail(code: ConstructorParameters<typeof FileConversionError>[0], message: string): never {
  throw new FileConversionError(code, message);
}

function isRecord(value: JsonValue): value is Record<string, JsonValue> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertJsonValue(
  value: unknown,
  path = "$",
  seen = new WeakSet<object>()
): asserts value is JsonValue {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "boolean" ||
    (typeof value === "number" && Number.isFinite(value))
  ) {
    return;
  }

  if (typeof value !== "object") {
    fail("INVALID_INPUT", `Unsupported value at ${path}.`);
  }

  if (seen.has(value)) {
    fail("INVALID_INPUT", `Circular data is not supported (${path}).`);
  }

  seen.add(value);

  if (Array.isArray(value)) {
    value.forEach((item, index) => assertJsonValue(item, `${path}[${index}]`, seen));
  } else {
    for (const [key, item] of Object.entries(value)) {
      assertJsonValue(item, `${path}.${key}`, seen);
    }
  }

  seen.delete(value);
}

function inputToText(input: InputPayload): string {
  if (typeof input === "string") return input;
  return new TextDecoder("utf-8", { fatal: true }).decode(input);
}

function inputSize(input: InputPayload): number {
  return typeof input === "string" ? new TextEncoder().encode(input).byteLength : input.byteLength;
}

function parseJson(input: string): JsonValue {
  try {
    const value: unknown = JSON.parse(input);
    assertJsonValue(value);
    return value;
  } catch (error) {
    if (error instanceof FileConversionError) throw error;
    fail(
      "INVALID_INPUT",
      `Invalid JSON: ${error instanceof Error ? error.message : "Unable to parse input."}`
    );
  }
}

function parseYaml(input: string): JsonValue {
  try {
    const value: unknown = yaml.load(input);
    if (value === undefined) fail("INVALID_INPUT", "YAML input is empty.");
    assertJsonValue(value);
    return value;
  } catch (error) {
    if (error instanceof FileConversionError) throw error;
    fail(
      "INVALID_INPUT",
      `Invalid YAML: ${error instanceof Error ? error.message : "Unable to parse input."}`
    );
  }
}

function parseTomlDocument(input: string): JsonValue {
  try {
    const value: unknown = toml.parse(input);
    assertJsonValue(value);
    return value;
  } catch (error) {
    if (error instanceof FileConversionError) throw error;
    fail(
      "INVALID_INPUT",
      `Invalid TOML: ${error instanceof Error ? error.message : "Unable to parse input."}`
    );
  }
}

function normalizeCell(value: unknown): JsonValue {
  if (value === undefined || value === null) return null;
  if (
    typeof value === "string" ||
    typeof value === "boolean" ||
    (typeof value === "number" && Number.isFinite(value))
  ) {
    return value;
  }
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map(normalizeCell);
  if (typeof value === "object") {
    const result: DataRecord = {};
    for (const [key, child] of Object.entries(value)) result[key] = normalizeCell(child);
    return result;
  }
  return String(value);
}

function sheetToRecords(sheet: XLSX.WorkSheet): TableData {
  const rows = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
    header: 1,
    defval: null,
    raw: true,
    blankrows: false,
  });

  if (rows.length === 0) return [];

  const headers = rows[0].map((cell, index) => {
    const header = cell === null || cell === undefined ? "" : String(cell).trim();
    return header || `column_${index + 1}`;
  });

  const uniqueHeaders = headers.map((header, index) => {
    const duplicateIndex = headers.slice(0, index).filter((item) => item === header).length;
    return duplicateIndex ? `${header}_${duplicateIndex + 1}` : header;
  });

  return rows.slice(1).map((row) => {
    const record: DataRecord = {};
    uniqueHeaders.forEach((header, index) => {
      record[header] = normalizeCell(row[index]);
    });
    return record;
  });
}

function parseSpreadsheet(input: InputPayload, format: "csv" | "tsv" | "xlsx"): NormalizedData {
  try {
    const workbook = XLSX.read(
      format === "xlsx" && input instanceof ArrayBuffer ? input : inputToText(input),
      {
        type: format === "xlsx" && input instanceof ArrayBuffer ? "array" : "string",
        raw: true,
        cellDates: true,
        FS: format === "tsv" ? "\t" : undefined,
      }
    );

    if (workbook.SheetNames.length === 0) fail("INVALID_INPUT", "No worksheets were found.");

    const sheets: Record<string, TableData> = {};
    for (const name of workbook.SheetNames) {
      const sheet = workbook.Sheets[name];
      if (sheet) sheets[name] = sheetToRecords(sheet);
    }

    if (format === "xlsx") return { kind: "workbook", sheets };
    const firstSheet = sheets[workbook.SheetNames[0]];
    return { kind: "value", value: firstSheet ?? [] };
  } catch (error) {
    if (error instanceof FileConversionError) throw error;
    fail(
      "INVALID_INPUT",
      `Invalid ${format.toUpperCase()} data: ${error instanceof Error ? error.message : "Unable to parse input."}`
    );
  }
}

function parseXml(input: string): JsonValue {
  const validation = SyntaxValidator.validate(input);
  if (validation !== true) {
    const errObj = validation as { err?: { msg?: string } };
    const message = errObj?.err?.msg ?? "Malformed XML.";
    fail("INVALID_INPUT", `Invalid XML: ${message}`);
  }

  try {
    const parsed: unknown = new XMLParser(XML_PARSER_OPTIONS).parse(input);
    assertJsonValue(parsed);
    return parsed;
  } catch (error) {
    if (error instanceof FileConversionError) throw error;
    fail(
      "INVALID_INPUT",
      `Invalid XML: ${error instanceof Error ? error.message : "Unable to parse input."}`
    );
  }
}

function parseHtmlTable(input: string): JsonValue {
  const document = new DOMParser().parseFromString(input, "text/html");
  if (document.querySelector("parsererror")) fail("INVALID_INPUT", "Invalid HTML.");
  const table = document.querySelector("table");
  if (!table) fail("INVALID_INPUT", "No HTML table was found.");

  const rows = [...table.querySelectorAll("tr")].map((row) =>
    [...row.querySelectorAll(":scope > th, :scope > td")].map(
      (cell) => cell.textContent?.trim() ?? ""
    )
  );

  return tableRowsToRecords(rows);
}

function splitMarkdownRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  const cells: string[] = [];
  let cell = "";
  let escaped = false;

  for (const character of trimmed) {
    if (escaped) {
      cell += character;
      escaped = false;
      continue;
    }
    if (character === "\\") {
      escaped = true;
      continue;
    }
    if (character === "|") {
      cells.push(cell.trim());
      cell = "";
      continue;
    }
    cell += character;
  }

  if (escaped) cell += "\\";
  cells.push(cell.trim());
  return cells;
}

function tableRowsToRecords(rows: string[][]): TableData {
  if (rows.length < 2)
    fail("INVALID_INPUT", "The table must contain a header row and at least one following row.");

  const headers = rows[0].map((header, index) => header.trim() || `column_${index + 1}`);
  const uniqueHeaders = headers.map((header, index) => {
    const duplicateIndex = headers.slice(0, index).filter((item) => item === header).length;
    return duplicateIndex ? `${header}_${duplicateIndex + 1}` : header;
  });

  const body = rows.slice(1);
  const firstBody = body[0] ?? [];
  const isMarkdownSeparator =
    firstBody.length === headers.length &&
    firstBody.every((cell) => /^:?-{3,}:?$/.test(cell.trim()));

  return (isMarkdownSeparator ? body.slice(1) : body).map((row) => {
    const record: DataRecord = {};
    uniqueHeaders.forEach((header, index) => {
      record[header] = row[index] ?? "";
    });
    return record;
  });
}

function parseMarkdownTable(input: string): JsonValue {
  const lines = input
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.includes("|"));

  if (lines.length < 2) fail("INVALID_INPUT", "No Markdown table was found.");

  const rows = lines.map(splitMarkdownRow);
  return tableRowsToRecords(rows);
}

function parseInput(input: InputPayload, format: FormatId): NormalizedData {
  if (inputSize(input) > MAX_INPUT_BYTES) {
    fail("INVALID_INPUT", `Input exceeds the ${MAX_INPUT_BYTES / 1024 / 1024} MB limit.`);
  }

  if (inputSize(input) === 0) fail("EMPTY_INPUT", "Provide a file or non-empty input.");

  if (format === "xlsx") return parseSpreadsheet(input, format);

  const text = inputToText(input);
  if (!text.trim()) fail("EMPTY_INPUT", "Provide a file or non-empty input.");

  switch (format) {
    case "csv":
    case "tsv":
      return parseSpreadsheet(text, format);
    case "json":
      return { kind: "value", value: parseJson(text) };
    case "yaml":
      return { kind: "value", value: parseYaml(text) };
    case "toml":
      return { kind: "value", value: parseTomlDocument(text) };
    case "xml":
      return { kind: "value", value: parseXml(text) };
    case "markdown-table":
      return { kind: "value", value: parseMarkdownTable(text) };
    case "html-table":
      return { kind: "value", value: parseHtmlTable(text) };
  }
}

function asJsonValue(data: NormalizedData, sheetName?: string): JsonValue {
  if (data.kind === "value") return data.value;

  const names = Object.keys(data.sheets);
  if (sheetName) {
    const selected = data.sheets[sheetName];
    if (!selected) fail("MISSING_SHEET", `Worksheet "${sheetName}" does not exist.`);
    return selected;
  }

  if (names.length === 1) return data.sheets[names[0]] ?? [];
  return Object.fromEntries(names.map((name) => [name, data.sheets[name] ?? []]));
}

function asTable(value: JsonValue, sheetName?: string): TableData {
  if (Array.isArray(value)) {
    return value.map((row, index) => {
      if (!isRecord(row)) {
        fail(
          "INCOMPATIBLE_DATA",
          `Row ${index + 1} is not an object. Table formats require an array of objects.`
        );
      }
      return row;
    });
  }

  if (isRecord(value)) {
    const selected = sheetName ? value[sheetName] : undefined;
    if (sheetName && selected !== undefined) {
      if (!Array.isArray(selected))
        fail("INCOMPATIBLE_DATA", `Worksheet "${sheetName}" is not a table.`);
      return selected.map((row, index) => {
        if (!isRecord(row)) fail("INCOMPATIBLE_DATA", `Row ${index + 1} is not an object.`);
        return row;
      });
    }

    const entries = Object.entries(value);
    if (entries.length > 0 && entries.every(([, item]) => Array.isArray(item))) {
      if (entries.length > 1 && !sheetName) {
        fail(
          "INCOMPATIBLE_DATA",
          "This data contains multiple tables. Select a sheet/table before converting to a single table."
        );
      }
      const first = entries[0]?.[1];
      if (Array.isArray(first)) {
        return first.map((row, index) => {
          if (!isRecord(row)) fail("INCOMPATIBLE_DATA", `Row ${index + 1} is not an object.`);
          return row;
        });
      }
    }

    return [value];
  }

  fail(
    "INCOMPATIBLE_DATA",
    "This value cannot be represented as a table. Use an array of objects or an object."
  );
}

function cellToText(value: JsonValue): string {
  if (value === null) return "";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function escapeDelimited(value: string, delimiter: string): string {
  if (value.includes(delimiter) || /["\r\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function serializeDelimited(value: JsonValue, delimiter: string, formatName: string): string {
  const rows = asTable(value);
  const headers = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
  if (headers.length === 0) {
    if (rows.length === 0) return "";
    fail("INCOMPATIBLE_DATA", `Cannot convert empty records to ${formatName}.`);
  }

  return [
    headers.map((header) => escapeDelimited(header, delimiter)).join(delimiter),
    ...rows.map((row) =>
      headers
        .map((header) => escapeDelimited(cellToText(row[header] ?? null), delimiter))
        .join(delimiter)
    ),
  ].join("\r\n");
}

function escapeMarkdownCell(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\|/g, "\\|").replace(/\r?\n/g, "<br>");
}

function serializeMarkdownTable(value: JsonValue): string {
  const rows = asTable(value);
  const headers = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
  if (headers.length === 0) return "";

  const header = `| ${headers.map(escapeMarkdownCell).join(" | ")} |`;
  const separator = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map(
    (row) =>
      `| ${headers.map((key) => escapeMarkdownCell(cellToText(row[key] ?? null))).join(" | ")} |`
  );

  return [header, separator, ...body].join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function serializeHtmlTable(value: JsonValue): string {
  const rows = asTable(value);
  const headers = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
  if (headers.length === 0) return "<table><thead><tr></tr></thead><tbody></tbody></table>";

  const head = headers.map((header) => `<th scope="col">${escapeHtml(header)}</th>`).join("");
  const body = rows
    .map(
      (row) =>
        `<tr>${headers.map((key) => `<td>${escapeHtml(cellToText(row[key] ?? null))}</td>`).join("")}</tr>`
    )
    .join("\n");

  return `<table>\n  <thead><tr>${head}</tr></thead>\n  <tbody>\n${body}\n  </tbody>\n</table>`;
}

function assertTomlCompatible(value: JsonValue): asserts value is Record<string, JsonValue> {
  if (!isRecord(value)) fail("INCOMPATIBLE_DATA", "TOML output requires a top-level object.");
}

function serializeXml(value: JsonValue): string {
  const rootValue = isRecord(value) && Object.keys(value).length === 1 ? value : { root: value };
  try {
    return new XMLBuilder(XML_BUILDER_OPTIONS).build(rootValue);
  } catch (error) {
    fail(
      "INVALID_OUTPUT",
      `Unable to serialize XML: ${error instanceof Error ? error.message : "Unknown error."}`
    );
  }
}

function serializeWorkbook(value: JsonValue, sheetName?: string): string {
  const workbook = XLSX.utils.book_new();
  const entries: [string, TableData][] =
    isRecord(value) && Object.values(value).every((item) => Array.isArray(item))
      ? (Object.entries(value) as [string, TableData][])
      : [[sheetName ?? "Sheet1", asTable(value, sheetName)]];

  const selectedEntries = sheetName ? entries.filter(([name]) => name === sheetName) : entries;

  if (selectedEntries.length === 0)
    fail("MISSING_SHEET", `Worksheet "${sheetName}" does not exist.`);

  for (const [name, rows] of selectedEntries) {
    if (!Array.isArray(rows)) fail("INCOMPATIBLE_DATA", `Worksheet "${name}" is not a table.`);
    const records = rows.map((row, index) => {
      if (!isRecord(row))
        fail("INCOMPATIBLE_DATA", `Row ${index + 1} in "${name}" is not an object.`);
      return row;
    });
    const worksheet = XLSX.utils.json_to_sheet(records);
    const safeName = name.slice(0, 31) || "Sheet1";

    XLSX.utils.book_append_sheet(workbook, worksheet, safeName);
  }

  return XLSX.write(workbook, { type: "base64", bookType: "xlsx" });
}

function serializeValue(value: JsonValue, format: FormatId): string {
  try {
    switch (format) {
      case "json":
        return JSON.stringify(value, null, 2);
      case "yaml":
        return yaml.dump(value, { indent: 2, lineWidth: -1, noRefs: true, sortKeys: false });
      case "toml":
        assertTomlCompatible(value);
        return toml.stringify(value as Parameters<typeof toml.stringify>[0]);
      case "xml":
        return serializeXml(value);
      case "csv":
        return serializeDelimited(value, ",", "CSV");
      case "tsv":
        return serializeDelimited(value, "\t", "TSV");
      case "markdown-table":
        return serializeMarkdownTable(value);
      case "html-table":
        return serializeHtmlTable(value);
      case "xlsx":
        return serializeWorkbook(value);
    }
  } catch (error) {
    if (error instanceof FileConversionError) throw error;
    fail(
      "INVALID_OUTPUT",
      `Unable to serialize ${format}: ${error instanceof Error ? error.message : "Unknown error."}`
    );
  }
}

function verifyOutput(output: string, format: FormatId): void {
  if (format === "xlsx") {
    try {
      const workbook = XLSX.read(output, { type: "base64" });
      if (workbook.SheetNames.length === 0)
        fail("INVALID_OUTPUT", "Generated workbook contains no worksheets.");
    } catch (error) {
      if (error instanceof FileConversionError) throw error;
      fail("INVALID_OUTPUT", "Generated XLSX output could not be reopened.");
    }
    return;
  }

  if (format === "json") {
    parseJson(output);
    return;
  }
  if (format === "yaml") {
    parseYaml(output);
    return;
  }
  if (format === "toml") {
    parseTomlDocument(output);
    return;
  }
  if (format === "xml") {
    parseXml(output);
    return;
  }
  if (format === "csv" || format === "tsv") {
    parseSpreadsheet(output, format);
    return;
  }
  if (format === "markdown-table") {
    if (output && !output.includes("|"))
      fail("INVALID_OUTPUT", "Generated Markdown table is invalid.");
    return;
  }
  if (format === "html-table") {
    const document = new DOMParser().parseFromString(output, "text/html");
    if (!document.querySelector("table"))
      fail("INVALID_OUTPUT", "Generated HTML table is invalid.");
  }
}

function detectFormat(input: string, fileName?: string): FormatDetection {
  const extension = fileName?.match(/\.[^.]+$/)?.[0]?.toLowerCase();
  if (extension) {
    const match = FORMAT_IDS.find((id) => FORMAT_REGISTRY[id].extensions.includes(extension));
    if (match) return { format: match, confidence: "high", reason: `File extension ${extension}` };
  }

  const trimmed = input.trim();
  if (!trimmed) return { format: null, confidence: "unknown", reason: "Input is empty." };

  if (/^\s*[\[{]/.test(trimmed)) {
    try {
      JSON.parse(trimmed);
      return { format: "json", confidence: "high", reason: "Valid JSON syntax" };
    } catch {
      if (/^\s*<[\w!?]/.test(trimmed)) {
        return { format: "xml", confidence: "medium", reason: "XML-like markup" };
      }
      return { format: "json", confidence: "low", reason: "JSON-like opening character" };
    }
  }

  if (/^\s*<table(?:\s|>)/i.test(trimmed) || /<table(?:\s|>)/i.test(trimmed)) {
    return { format: "html-table", confidence: "high", reason: "HTML table element" };
  }
  if (/^\s*</.test(trimmed))
    return { format: "xml", confidence: "medium", reason: "Markup-like input" };

  const lines = trimmed.split(/\r?\n/);
  if (lines.length >= 2 && lines[0]?.includes("|") && /^\|?\s*:?-{3,}/.test(lines[1] ?? "")) {
    return { format: "markdown-table", confidence: "high", reason: "Markdown table separator row" };
  }
  if (/^\s*\[[\w.-]+\]\s*$/m.test(trimmed) || /^\s*[\w.-]+\s*=\s*.+$/m.test(trimmed)) {
    return { format: "toml", confidence: "low", reason: "TOML-like key/value syntax" };
  }
  if (/^\s*[\w.-]+\s*:\s*(?:\S.*)?$/m.test(trimmed) || /^\s*-\s+\S/m.test(trimmed)) {
    return { format: "yaml", confidence: "low", reason: "YAML-like syntax" };
  }
  if (lines.length >= 2 && lines.every((line) => line.includes("\t"))) {
    return { format: "tsv", confidence: "medium", reason: "Tab-separated rows" };
  }
  if (lines.length >= 2 && lines.some((line) => line.includes(","))) {
    return { format: "csv", confidence: "low", reason: "Comma-separated rows" };
  }

  return {
    format: "json",
    confidence: "low",
    reason: "No confident format match; JSON is the fallback suggestion.",
  };
}

export function convertData(input: InputPayload, options: ConversionOptions): ConversionResult {
  const sourceFormat =
    options.sourceFormat && options.sourceFormat !== "auto"
      ? options.sourceFormat
      : typeof input === "string"
        ? detectFormat(input, options.fileName).format
        : detectFormat("", options.fileName).format;

  if (!sourceFormat)
    fail("UNSUPPORTED_FORMAT", "Could not determine the input format. Select it manually.");
  if (!FORMAT_IDS.includes(sourceFormat))
    fail("UNSUPPORTED_FORMAT", `Unsupported input format: ${sourceFormat}.`);

  const parsed = parseInput(input, sourceFormat);
  const value = asJsonValue(parsed, options.sheetName);
  const output =
    options.targetFormat === "xlsx" && parsed.kind === "workbook"
      ? serializeWorkbook(value, options.sheetName)
      : serializeValue(value, options.targetFormat);
  verifyOutput(output, options.targetFormat);

  const warnings: ConversionWarning[] = [];
  if (parsed.kind === "workbook" && Object.keys(parsed.sheets).length > 1 && !options.sheetName) {
    if (
      options.targetFormat === "xlsx" ||
      options.targetFormat === "json" ||
      options.targetFormat === "yaml"
    ) {
      warnings.push({
        code: "selected-sheet",
        message: "All workbook sheets were preserved in the structured output.",
      });
    } else {
      fail(
        "INCOMPATIBLE_DATA",
        "This workbook contains multiple sheets. Select a sheet before converting to a single-table format."
      );
    }
  }

  return {
    output,
    outputFormat: options.targetFormat,
    mimeType: FORMAT_REGISTRY[options.targetFormat].mimeType,
    extension: FORMAT_REGISTRY[options.targetFormat].extensions[0]!.slice(1),
    warnings,
  };
}

export function getFormatDefinition(format: FormatId): FormatDefinition {
  return FORMAT_REGISTRY[format];
}

export function isFormatId(value: string): value is FormatId {
  return FORMAT_IDS.some((format) => format === value);
}
