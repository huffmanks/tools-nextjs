export const outputValues = {
  output: { html: "", markdown: "", plaintext: "" },
  h1: "",
  h2: "",
  h3: "",
  h4: "",
  p: "",
  blockquote: "",
  ul: "",
  ol: "",
  table: "",
};

export const checkAllValues = {
  check_h1: true,
  check_h2: true,
  check_h3: true,
  check_h4: true,
  check_p: true,
  check_blockquote: true,
  check_ul: true,
  check_ol: true,
  check_table: true,
};

export const checkNoneValues = {
  check_h1: false,
  check_h2: false,
  check_h3: false,
  check_h4: false,
  check_p: false,
  check_blockquote: false,
  check_ul: false,
  check_ol: false,
  check_table: false,
};

export const initialValues = {
  ...outputValues,
  ...checkNoneValues,
  check_p: true,
};

export const elements = [
  {
    name: "check_all",
    label: "Select all",
    isSelectAll: true,
  },
  {
    name: "h1",
    label: "Heading 1",
  },
  {
    name: "h2",
    label: "Heading 2",
  },
  {
    name: "h3",
    label: "Heading 3",
  },
  {
    name: "h4",
    label: "Heading 4",
  },
  {
    name: "p",
    label: "Paragraph",
  },
  {
    name: "blockquote",
    label: "Blockquote",
  },
  {
    name: "ul",
    label: "Unordered list",
  },
  {
    name: "ol",
    label: "Ordered list",
  },
  {
    name: "table",
    label: "Table",
  },
];

export const mockContentFormatTabs = [
  {
    value: "plaintext",
    label: "Plain text",
  },
  {
    value: "html",
    label: "HTML",
  },
  {
    value: "markdown",
    label: "Markdown",
  },
];
