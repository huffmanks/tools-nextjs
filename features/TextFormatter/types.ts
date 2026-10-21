export interface SavedItem {
  id: string;
  value: string;
  label: string;
}

export type TextFormatterCardName =
  | "lowerCase"
  | "upperCase"
  | "capitalCase"
  | "sentenceCase"
  | "camelCase"
  | "snakeCase"
  | "headerCase"
  | "constantCase";

export interface TextFormatterValues {
  output: string;
  selectedId: string;
  lowerCase: string;
  upperCase: string;
  capitalCase: string;
  sentenceCase: string;
  camelCase: string;
  snakeCase: string;
  headerCase: string;
  constantCase: string;
  saved: SavedItem[];
  check_lowerCase: boolean;
  check_upperCase: boolean;
  check_capitalCase: boolean;
  check_sentenceCase: boolean;
  check_camelCase: boolean;
  check_snakeCase: boolean;
  check_headerCase: boolean;
  check_constantCase: boolean;
}

export interface TextFormatterCardInfo {
  name: TextFormatterCardName;
  label: string;
}
