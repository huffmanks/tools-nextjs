export const initialValues = {
  action: "",
  format: "",
  codeInput: "",
  codeOutput: "",
};

export const codeActionSelect = {
  label: "Action",
  placeholder: "Select a task",
  name: "action",
  options: [
    {
      label: "Decode",
      value: "decode",
    },
    {
      label: "Encode",
      value: "encode",
    },
    {
      label: "Minify",
      value: "minify",
    },
    {
      label: "Un-minify",
      value: "un-minify",
    },
    {
      label: "Stringify",
      value: "stringify",
    },
    {
      label: "Un-stringify",
      value: "un-stringify",
    },
  ],
};

export const codeFormatSelect = {
  label: "Format",
  placeholder: "Select code format",
  name: "format",
  options: [
    {
      label: "CSS",
      value: "css",
    },
    {
      label: "HTML",
      value: "html",
    },
    {
      label: "JavaScript",
      value: "js",
    },
    {
      label: "JSON",
      value: "json",
    },
    {
      label: "Plain text",
      value: "plaintext",
    },
  ],
};
