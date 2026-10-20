export interface GenerateRandomNumbersProps {
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
