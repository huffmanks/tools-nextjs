import { passwordGeneratorIncludedItems } from "@/features/PasswordGenerator/constants";

type RandomGeneratorFunc = (excludeSimilar: boolean) => string | number;

const getRandomSymbol: RandomGeneratorFunc = () => {
  const symbols = "!@#$%&*";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const getRandomNumber: RandomGeneratorFunc = (excludeSimilar) => {
  const items = [3, 4, 6, 7, 9];

  if (excludeSimilar) {
    return items[Math.floor(Math.random() * items.length)];
  } else {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }
};

const getRandomLower: RandomGeneratorFunc = (excludeSimilar) => {
  if (excludeSimilar) {
    return passwordGeneratorIncludedItems[
      Math.floor(Math.random() * passwordGeneratorIncludedItems.length)
    ];
  } else {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }
};

const getRandomUpper: RandomGeneratorFunc = (excludeSimilar) => {
  const items = passwordGeneratorIncludedItems.map((letter) => letter.toUpperCase());

  if (excludeSimilar) {
    return items[Math.floor(Math.random() * items.length)];
  } else {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }
};

const randomGenerator: Record<string, RandomGeneratorFunc> = {
  symbols: getRandomSymbol,
  numbers: getRandomNumber,
  lowerCase: getRandomLower,
  upperCase: getRandomUpper,
};

const shuffle = (str: string) => [...str].sort(() => Math.random() - 0.5).join("");

export const generatePassword = (
  symbols: boolean,
  numbers: boolean,
  lowerCase: boolean,
  upperCase: boolean,
  excludeSimilar: boolean,
  length: number
): string => {
  const typesCount = Number(symbols) + Number(numbers) + Number(lowerCase) + Number(upperCase);

  const typesArr = [{ symbols }, { numbers }, { lowerCase }, { upperCase }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }

  const iterate = Math.ceil(length / typesCount);
  let generatedPassword = "";

  Array.from({ length: iterate }, () => {
    typesArr.map((type) => {
      const name = Object.keys(type)[0];

      generatedPassword += String(randomGenerator[name](excludeSimilar));
    });
  });

  const finalPassword = shuffle(generatedPassword).slice(0, length);

  return finalPassword;
};
