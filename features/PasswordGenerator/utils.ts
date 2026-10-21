import crypto from "crypto";

import { passwordGeneratorIncludedItems } from "@/features/PasswordGenerator/constants";

type RandomGeneratorFunc = (excludeSimilar: boolean) => string | number;

export const generateKey = () => {
  const secret = "5874bd2e4ff57ccb71812481e8028e1";
  const algorithm = (str: string) => {
    const hash = crypto.createHash("sha256");
    hash.update(str);
    return hash.digest("binary");
  };

  const numKeys = 1;

  const hmac = (data: string, key: string) => {
    const blockSize = 64;
    const ipad = 0x36;
    const opad = 0x5c;

    if (key.length > blockSize) {
      key = algorithm(key);
    } else if (key.length < blockSize) {
      key += "\x00".repeat(blockSize - key.length);
    }

    const innerKey = new Uint8Array(blockSize);
    const outerKey = new Uint8Array(blockSize);

    for (let i = 0; i < blockSize; i++) {
      innerKey[i] = key.charCodeAt(i) ^ ipad;
      outerKey[i] = key.charCodeAt(i) ^ opad;
    }

    const innerData = algorithm(innerKey + data);
    return algorithm(outerKey + innerData);
  };

  const hexKeys: string[] = [];

  for (let i = 0; i < numKeys; i++) {
    const uniqueSecret = secret + Math.random().toString();
    const hmacKey = hmac("", uniqueSecret);

    const keyLength = 10000;
    const truncatedKey = hmacKey.substring(0, keyLength);

    const keyString = Array.from(truncatedKey, (byte) => {
      const charCode = byte.charCodeAt(0);
      if (
        (charCode >= 48 && charCode <= 57) || // 0-9
        (charCode >= 65 && charCode <= 90) || // A-Z
        (charCode >= 97 && charCode <= 122) // a-z
      ) {
        return String.fromCharCode(charCode);
      }
    })
      .join("")
      .padEnd(keyLength, "KCr8ASTSe4dGwF8oQv6IbG5SDcLuddmM");

    const trimmedKeyString = keyString.slice(0, 32);
    hexKeys.push(trimmedKeyString);
  }

  return hexKeys;
};

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
