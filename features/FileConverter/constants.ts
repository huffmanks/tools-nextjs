import { type ConversionOption } from "@/features/FileConverter/types";

export const conversionActionSelect = {
  name: "action",
  label: "Conversion Type",
  placeholder: "Select conversion type",
  options: [
    { label: "JSON to CSV", value: "json-to-csv", sourceFormats: ["json"], targetFormats: ["csv"] },
    { label: "CSV to JSON", value: "csv-to-json", sourceFormats: ["csv"], targetFormats: ["json"] },
    {
      label: "JSON to YAML",
      value: "json-to-yaml",
      sourceFormats: ["json"],
      targetFormats: ["yaml"],
    },
    {
      label: "YAML to JSON",
      value: "yaml-to-json",
      sourceFormats: ["yaml"],
      targetFormats: ["json"],
    },
    { label: "JSON to XML", value: "json-to-xml", sourceFormats: ["json"], targetFormats: ["xml"] },
    { label: "XML to JSON", value: "xml-to-json", sourceFormats: ["xml"], targetFormats: ["json"] },
    {
      label: "Text to Base64",
      value: "text-to-base64",
      sourceFormats: ["text"],
      targetFormats: ["base64"],
    },
    {
      label: "Base64 to Text",
      value: "base64-to-text",
      sourceFormats: ["base64"],
      targetFormats: ["text"],
    },
    {
      label: "Text to URL Encode",
      value: "text-to-url",
      sourceFormats: ["text"],
      targetFormats: ["url"],
    },
    {
      label: "URL Decode to Text",
      value: "url-to-text",
      sourceFormats: ["url"],
      targetFormats: ["text"],
    },
    {
      label: "JSON to Markdown Table",
      value: "json-to-md",
      sourceFormats: ["json"],
      targetFormats: ["markdown"],
    },
  ] as ConversionOption[],
};

export const initialFileConverterValues = {
  action: "",
  inputData: "",
  outputData: "",
  fileName: "converted-output",
};
