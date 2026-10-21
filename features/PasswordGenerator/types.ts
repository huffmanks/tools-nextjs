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
