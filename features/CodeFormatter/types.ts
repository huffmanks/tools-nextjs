export interface CodeOption {
  label: string;
  value: string;
}

export interface CodeSelectConfig {
  label: string;
  placeholder: string;
  name: string;
  options: CodeOption[];
}

export interface CodeFormatterValues {
  action: string;
  format: string;
  codeInput: string;
  codeOutput: string;
}

export interface CodeFormatterErrors {
  codeInput?: string;
  action?: string;
  format?: string;
  codeOutput?: string;
  [key: string]: string | undefined;
}

export type CodeFormat = "plaintext" | "json" | "html" | "css" | "js";
