import * as XMLBuilderModule from "fast-xml-builder";
import { XMLParser } from "fast-xml-parser";
import * as yaml from "js-yaml";
import * as XLSX from "xlsx";

const XMLBuilder = (XMLBuilderModule as any).default || XMLBuilderModule;

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };
type FlattenedRecord = Record<string, JsonPrimitive>;

const flattenObject = (obj: JsonValue, prefix = "", res: FlattenedRecord = {}): FlattenedRecord => {
  if (obj === null || typeof obj !== "object") {
    res[prefix] = obj as JsonPrimitive;
    return res;
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      flattenObject(item, `${prefix}[${index}]`, res);
    });
    return res;
  }
  for (const key of Object.keys(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    flattenObject((obj as Record<string, JsonValue>)[key], newKey, res);
  }
  return res;
};

const unflattenObject = (data: Record<string, unknown>): Record<string, unknown> => {
  const result: Record<string, unknown> = {};

  for (const key of Object.keys(data)) {
    const value = data[key];
    const parts = key.split(".");
    let current = result;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;

      if (isLast) {
        current[part] = value;
      } else {
        if (!current[part] || typeof current[part] !== "object") {
          current[part] = {};
        }
        current = current[part] as Record<string, unknown>;
      }
    }
  }

  return result;
};

interface DataTransformerParams {
  inputData: string;
  action: string;
}

export const dataTransformer = ({ inputData, action }: DataTransformerParams): string => {
  if (!inputData.trim()) return "";

  switch (action) {
    case "json-to-csv": {
      let parsed: JsonValue;
      try {
        parsed = JSON.parse(inputData) as JsonValue;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown JSON error";
        throw new Error(`Invalid JSON: ${message}`);
      }
      const items = Array.isArray(parsed) ? parsed : [parsed];
      const flattenedItems = items.map((item) => flattenObject(item));
      const worksheet = XLSX.utils.json_to_sheet(flattenedItems);
      return XLSX.utils.sheet_to_csv(worksheet);
    }

    case "csv-to-json": {
      try {
        const workbook = XLSX.read(inputData, { type: "string" });
        const firstSheetName = workbook.SheetNames[0];

        if (!firstSheetName) throw new Error("No sheets found in CSV/Spreadsheet data.");
        const worksheet = workbook.Sheets[firstSheetName];

        const rawJson = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet);

        if (rawJson.length === 0) throw new Error("Parsed CSV resulted in empty data.");
        const unflattenedJson = rawJson.map((row) => unflattenObject(row));

        return JSON.stringify(unflattenedJson, null, 2);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown CSV parsing error";
        throw new Error(`CSV Parsing Error: ${message}`);
      }
    }

    case "json-to-yaml": {
      let parsed: JsonValue;
      try {
        parsed = JSON.parse(inputData) as JsonValue;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown JSON error";
        throw new Error(`Invalid JSON: ${message}`);
      }
      return yaml.dump(parsed, { indent: 2, lineWidth: -1 });
    }

    case "yaml-to-json": {
      try {
        const parsed = yaml.load(inputData);
        if (parsed === undefined) throw new Error("YAML parsed to undefined.");
        return JSON.stringify(parsed, null, 2);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown YAML error";
        throw new Error(`Invalid YAML: ${message}`);
      }
    }

    case "json-to-xml": {
      let parsed: JsonValue;
      try {
        parsed = JSON.parse(inputData) as JsonValue;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown JSON error";
        throw new Error(`Invalid JSON: ${message}`);
      }
      const builder = new XMLBuilder({ format: true, indentBy: "  " });
      const result = builder.build(parsed);
      return typeof result === "string" ? result : String(result);
    }

    case "xml-to-json": {
      try {
        const parser = new XMLParser({ ignoreAttributes: false, parseTagValue: true });
        const parsed = parser.parse(inputData);
        if (parsed === undefined) throw new Error("XML parsed to undefined.");
        return JSON.stringify(parsed, null, 2);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown XML error";
        throw new Error(`Invalid XML: ${message}`);
      }
    }

    case "text-to-base64":
      return btoa(unescape(encodeURIComponent(inputData)));

    case "base64-to-text":
      try {
        return decodeURIComponent(escape(atob(inputData)));
      } catch {
        throw new Error("Invalid Base64 encoded string.");
      }

    case "text-to-url":
      return encodeURIComponent(inputData);

    case "url-to-text":
      return decodeURIComponent(inputData);

    case "json-to-md": {
      let parsed: JsonValue;
      try {
        parsed = JSON.parse(inputData) as JsonValue;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown JSON error";
        throw new Error(`Invalid JSON: ${message}`);
      }
      const items = Array.isArray(parsed) ? parsed : [parsed];
      const flattenedItems = items.map((item) => flattenObject(item));
      if (flattenedItems.length === 0) return "";

      const headers = Array.from(new Set(flattenedItems.flatMap((item) => Object.keys(item))));
      const headerRow = `| ${headers.join(" | ")} |`;
      const separatorRow = `| ${headers.map(() => "---").join(" | ")} |`;
      const bodyRows = flattenedItems.map(
        (row) => `| ${headers.map((h) => String(row[h] ?? "")).join(" | ")} |`
      );
      return [headerRow, separatorRow, ...bodyRows].join("\n");
    }

    default:
      throw new Error(`Unsupported conversion action: ${action}`);
  }
};

export const getFileExtension = (action: string): string => {
  if (action.endsWith("-csv")) return "csv";
  if (action.endsWith("-json")) return "json";
  if (action.endsWith("-yaml")) return "yaml";
  if (action.endsWith("-xml")) return "xml";
  if (action.endsWith("-md")) return "md";
  return "txt";
};
