import { GLOBAL_SITE_LS_KEY_PREFIX } from "@/constants/global";

export const TEXT_FORMATTER_LS_KEY = `${GLOBAL_SITE_LS_KEY_PREFIX}_text-formatter`;

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

const textFormatterOutputValues = {
  output: "",
  selectedId: "",
  lowerCase: "",
  upperCase: "",
  capitalCase: "",
  sentenceCase: "",
  camelCase: "",
  snakeCase: "",
  headerCase: "",
  constantCase: "",
  saved: [],
};

export const textFormatterCheckAllValues: Record<`check_${TextFormatterCardName}`, boolean> = {
  check_lowerCase: true,
  check_upperCase: true,
  check_capitalCase: true,
  check_sentenceCase: true,
  check_camelCase: true,
  check_snakeCase: true,
  check_headerCase: true,
  check_constantCase: true,
};

export const textFormatterCheckNoneValues: Record<`check_${TextFormatterCardName}`, boolean> = {
  check_lowerCase: false,
  check_upperCase: false,
  check_capitalCase: false,
  check_sentenceCase: false,
  check_camelCase: false,
  check_snakeCase: false,
  check_headerCase: false,
  check_constantCase: false,
};

export const initialTextFormatterValues: TextFormatterValues = {
  ...textFormatterOutputValues,
  ...textFormatterCheckNoneValues,
  check_capitalCase: true,
  check_headerCase: true,
};

export interface TextFormatterCardInfo {
  name: TextFormatterCardName;
  label: string;
}

export const textFormatterCards: TextFormatterCardInfo[] = [
  {
    name: "lowerCase",
    label: "Lowercase",
  },
  {
    name: "upperCase",
    label: "Uppercase",
  },
  {
    name: "capitalCase",
    label: "Capitalize",
  },
  {
    name: "sentenceCase",
    label: "Sentence",
  },
  {
    name: "camelCase",
    label: "Camel case",
  },
  {
    name: "snakeCase",
    label: "Snake case",
  },
  {
    name: "headerCase",
    label: "Kebab case",
  },
  {
    name: "constantCase",
    label: "Constant",
  },
];
