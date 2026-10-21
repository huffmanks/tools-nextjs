export interface MockContentOutputBundle {
  html: string;
  markdown: string;
  plaintext: string;
}

export interface MockContentOutputValues {
  output: MockContentOutputBundle;
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  p: string;
  blockquote: string;
  ul: string;
  ol: string;
  table: string;
}

const mockContentOutputValues: MockContentOutputValues = {
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

export interface MockContentCheckValues {
  check_h1: boolean;
  check_h2: boolean;
  check_h3: boolean;
  check_h4: boolean;
  check_p: boolean;
  check_blockquote: boolean;
  check_ul: boolean;
  check_ol: boolean;
  check_table: boolean;
  check_inline_bold: boolean;
  check_inline_italic: boolean;
  check_inline_links: boolean;
}

export const mockContentCheckAllValues: MockContentCheckValues = {
  check_h1: true,
  check_h2: true,
  check_h3: true,
  check_h4: true,
  check_p: true,
  check_blockquote: true,
  check_ul: true,
  check_ol: true,
  check_table: true,
  check_inline_bold: true,
  check_inline_italic: true,
  check_inline_links: true,
};

export const mockContentCheckNoneValues: MockContentCheckValues = {
  check_h1: false,
  check_h2: false,
  check_h3: false,
  check_h4: false,
  check_p: false,
  check_blockquote: false,
  check_ul: false,
  check_ol: false,
  check_table: false,
  check_inline_bold: false,
  check_inline_italic: false,
  check_inline_links: false,
};

export type MockContentValues = MockContentOutputValues & MockContentCheckValues;

export const initialMockContentValues: MockContentValues = {
  ...mockContentOutputValues,
  ...mockContentCheckNoneValues,
  check_p: true,
};

export interface MockContentElement {
  name: string;
  label: string;
  isSelectAll?: boolean;
}

export const mockContentElements: MockContentElement[] = [
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
  {
    name: "inline_bold",
    label: "Bold text",
  },
  {
    name: "inline_italic",
    label: "Italic text",
  },
  {
    name: "inline_links",
    label: "Links",
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

export const STOP_WORDS = new Set([
  "the",
  "a",
  "an",
  "to",
  "and",
  "or",
  "but",
  "in",
  "on",
  "at",
  "by",
  "for",
  "with",
  "of",
  "so",
  "is",
  "are",
  "it",
  "its",
  "as",
]);
