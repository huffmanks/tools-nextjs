import { type ConversionOption } from "@/features/FileConverter/types";

export const conversionActionSelect = {
  name: "action",
  label: "Target Format",
  placeholder: "Select target format",
  options: [
    { label: "CSV", value: "csv", sourceFormats: ["auto"], targetFormats: ["csv"] },
    { label: "TSV", value: "tsv", sourceFormats: ["auto"], targetFormats: ["tsv"] },
    {
      label: "Excel Workbook (.xlsx)",
      value: "xlsx",
      sourceFormats: ["auto"],
      targetFormats: ["xlsx"],
    },
    { label: "JSON", value: "json", sourceFormats: ["auto"], targetFormats: ["json"] },
    { label: "YAML", value: "yaml", sourceFormats: ["auto"], targetFormats: ["yaml"] },
    { label: "TOML", value: "toml", sourceFormats: ["auto"], targetFormats: ["toml"] },
    { label: "XML", value: "xml", sourceFormats: ["auto"], targetFormats: ["xml"] },
    {
      label: "Markdown Table",
      value: "markdown-table",
      sourceFormats: ["auto"],
      targetFormats: ["markdown-table"],
    },
    {
      label: "HTML Table",
      value: "html-table",
      sourceFormats: ["auto"],
      targetFormats: ["html-table"],
    },
  ] as ConversionOption[],
};

export const initialFileConverterValues = {
  action: "" as const,
  inputData: "",
  outputData: "",
  fileName: "converted-output",
  sourceFormat: "auto" as const,
  inputFileName: "",
};
