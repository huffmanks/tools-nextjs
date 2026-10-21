interface SeparatedStringsProps {
  inputDelimiter: "newline" | "comma" | "pipe" | string;
  list: string;
}

interface ErrorResult {
  isError: boolean;
  message: string;
}

export const generateSeparatedStrings = (items: SeparatedStringsProps): string[] | ErrorResult => {
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

interface GenerateRandomNumbersProps {
  total: number;
  lowerNumber: number;
  higherNumber: number;
  unique?: boolean;
  sorted?: boolean;
  isLottery?: boolean;
}

export const generateRandomNumbers = ({
  total,
  lowerNumber,
  higherNumber,
  unique,
  sorted,
  isLottery,
}: GenerateRandomNumbersProps) => {
  if (isLottery) {
    total = 4;
  }

  const quantity = total * 3;
  let output: number[];

  if (unique) {
    const set = new Set<number>();
    Array.from({ length: quantity }, () => {
      set.add(getRandomNumber(lowerNumber, higherNumber));
    });
    output = Array.from(set).slice(0, total);
  } else {
    output = Array.from({ length: total }, () => getRandomNumber(lowerNumber, higherNumber));
  }

  if (sorted) {
    output.sort((a, b) => a - b);
  }

  return output;
};

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
