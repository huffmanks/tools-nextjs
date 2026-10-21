import { generateKey } from "@/utils/generateKey";

export type PasswordBooleanKey = {
  [K in keyof PasswordGeneratorValues]: PasswordGeneratorValues[K] extends boolean ? K : never;
}[keyof PasswordGeneratorValues];

export interface PasswordGeneratorOption {
  id: number;
  label: string;
  name: PasswordBooleanKey;
}

export interface PasswordGeneratorValues {
  passwordType: "password" | "keygen";
  slider: number;
  symbols: boolean;
  numbers: boolean;
  lowerCase: boolean;
  upperCase: boolean;
  excludeSimilar: boolean;
  password: string;
  showPassword: boolean;
  keygen: string[];
}

const keygen = generateKey();

export const initialPasswordGeneratorValues: PasswordGeneratorValues = {
  passwordType: "password",
  slider: 12,
  symbols: true,
  numbers: true,
  lowerCase: true,
  upperCase: true,
  excludeSimilar: false,
  password: "",
  showPassword: false,
  keygen,
};

export const passwordGeneratorMarks = [
  {
    value: 8,
    label: 8,
  },
  {
    value: 10,
    label: 10,
  },
  {
    value: 12,
    label: 12,
  },
  {
    value: 14,
    label: 14,
  },
  {
    value: 16,
    label: 16,
  },
  {
    value: 18,
    label: 18,
  },
  {
    value: 20,
    label: 20,
  },
  {
    value: 22,
    label: 22,
  },
  {
    value: 24,
    label: 24,
  },
];

export const passwordGeneratorOptions: PasswordGeneratorOption[] = [
  {
    id: 1,
    label: "Include symbols",
    name: "symbols",
  },
  {
    id: 2,
    label: "Include numbers",
    name: "numbers",
  },
  {
    id: 3,
    label: "Include lowercase characters",
    name: "lowerCase",
  },
  {
    id: 4,
    label: "Include uppercase characters",
    name: "upperCase",
  },
  {
    id: 5,
    label: "Exclude similar characters",
    name: "excludeSimilar",
  },
];

export const passwordGeneratorIncludedItems = [
  "a",
  "c",
  "e",
  "f",
  "g",
  "h",
  "j",
  "k",
  "m",
  "n",
  "p",
  "r",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
];
