import { GLOBAL_SITE_LS_KEY_PREFIX } from "./global";

export const ITEM_PICKER_LS_KEY = `${GLOBAL_SITE_LS_KEY_PREFIX}_item-picker`;

export const initialValues = {
  total: 1,
  listType: "upload",
  selectedRows: [],
  isProcessing: false,
  fileName: "",
  inputDelimiter: "newline",
  outputDelimiter: "newline",
  list: "",
  output: [],
};

export const itemRadios = [
  {
    value: "upload",
    label: "Upload",
  },
  {
    value: "text",
    label: "Text",
  },
];

export const delimiterSelects = [
  {
    value: "inputDelimiter",
    label: "Input",
  },
  {
    value: "outputDelimiter",
    label: "Output",
  },
];

export const delimiterOptions = [
  {
    value: "newline",
    label: "Newline",
  },
  {
    value: "comma",
    label: "Comma",
  },
  {
    value: "pipe",
    label: "Pipe",
  },
];
