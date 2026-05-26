import { GLOBAL_SITE_LS_KEY_PREFIX } from "./global";

export const TEXT_FORMATTER_LS_KEY = `${GLOBAL_SITE_LS_KEY_PREFIX}_text-formatter`;

export const outputValues = {
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

export const checkAllValues = {
  check_lowerCase: true,
  check_upperCase: true,
  check_capitalCase: true,
  check_sentenceCase: true,
  check_camelCase: true,
  check_snakeCase: true,
  check_headerCase: true,
  check_constantCase: true,
};

export const checkNoneValues = {
  check_lowerCase: false,
  check_upperCase: false,
  check_capitalCase: false,
  check_sentenceCase: false,
  check_camelCase: false,
  check_snakeCase: false,
  check_headerCase: false,
  check_constantCase: false,
};

export const initialValues = {
  ...outputValues,
  ...checkNoneValues,
  check_capitalCase: true,
  check_headerCase: true,
};

export const cards = [
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
