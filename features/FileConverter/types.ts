export interface ConversionOption {
  label: string;
  value: string;
  sourceFormats: string[];
  targetFormats: string[];
}

export interface FileConverterValues {
  action: string;
  inputData: string;
  outputData: string;
  fileName: string;
}

export type FileConverterErrors = Record<string, string>;
