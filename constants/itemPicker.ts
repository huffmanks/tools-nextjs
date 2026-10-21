import { GLOBAL_SITE_LS_KEY_PREFIX } from "./global";

export const ITEM_PICKER_LS_KEY = `${GLOBAL_SITE_LS_KEY_PREFIX}_item-picker`;

export interface ItemPickerValues {
  total: number;
  listType: string;
  selectedRows: unknown[][];
  isProcessing: boolean;
  fileName: string;
  inputDelimiter: string;
  outputDelimiter: string;
  list: string;
  output: string[];
}

export const initialItemPickerValues: ItemPickerValues = {
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

export const itemPickerRadios = [
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
    value: "inputDelimiter" as const,
    label: "Input",
  },
  {
    value: "outputDelimiter" as const,
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
