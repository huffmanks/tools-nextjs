export interface ConversionOption {
  label: string;
  value: string;
  sourceFormats: string[];
  targetFormats: string[];
}

export type FileConverterValues = {
  inputData: string | ArrayBuffer;
  sourceFormat: FormatId | "auto";
  action: FormatId | "";
  inputFileName: string;
  fileName: string;
};

export type FileConverterErrors = Record<string, string>;

export const FORMAT_IDS = [
  "csv",
  "tsv",
  "xlsx",
  "xml",
  "json",
  "markdown-table",
  "html-table",
  "toml",
  "yaml",
] as const;

export type FormatId = (typeof FORMAT_IDS)[number];

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };
export type DataRecord = Record<string, JsonValue>;
export type TableData = DataRecord[];

export type WorkbookData = {
  kind: "workbook";
  sheets: Record<string, TableData>;
};

export type NormalizedData =
  | {
      kind: "value";
      value: JsonValue;
    }
  | WorkbookData;

export type InputPayload = string | ArrayBuffer;

export type FormatDefinition = {
  id: FormatId;
  label: string;
  extensions: readonly string[];
  mimeType: string;
  binary: boolean;
};

export type ConversionOptions = {
  sourceFormat?: FormatId | "auto";
  targetFormat: FormatId;
  fileName?: string;
  sheetName?: string;
};

export type ConversionWarning =
  | { code: "selected-sheet"; message: string }
  | { code: "type-coercion"; message: string }
  | { code: "lossy-conversion"; message: string };

export type ConversionResult = {
  output: string;
  outputFormat: FormatId;
  mimeType: string;
  extension: string;
  warnings: ConversionWarning[];
};

export type FormatDetection = {
  format: FormatId | null;
  confidence: "high" | "medium" | "low" | "unknown";
  reason: string;
};

export class FileConversionError extends Error {
  readonly code:
    | "EMPTY_INPUT"
    | "UNSUPPORTED_FORMAT"
    | "INVALID_INPUT"
    | "INVALID_OUTPUT"
    | "INCOMPATIBLE_DATA"
    | "MISSING_SHEET";

  constructor(code: FileConversionError["code"], message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "FileConversionError";
    this.code = code;
  }
}
