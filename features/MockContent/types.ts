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

export type MockContentValues = MockContentOutputValues & MockContentCheckValues;

export interface MockContentElement {
  name: string;
  label: string;
  isSelectAll?: boolean;
}
