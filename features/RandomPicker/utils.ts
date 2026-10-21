interface SeparatedStringsInput {
  inputDelimiter: "newline" | "comma" | "pipe" | string;
  list: string;
}

interface ErrorResult {
  isError: boolean;
  message: string;
}

export const generateSeparatedStrings = (items: SeparatedStringsInput): string[] | ErrorResult => {
  let values: string[] | ErrorResult = {
    isError: true,
    message: `The inserted items do not contain any ${items.inputDelimiter}s.`,
  };

  if (items.inputDelimiter === "newline") {
    if (!items.list.includes("\n")) return values;
    values = items.list.replace(/\r\n/g, "\n").split("\n");
  }

  if (items.inputDelimiter === "comma") {
    if (!items.list.includes(",")) return values;

    values = items.list.split(",");
  }

  if (items.inputDelimiter === "pipe") {
    if (!items.list.includes("|")) return values;

    values = items.list.split("|");
  }

  return values;
};
