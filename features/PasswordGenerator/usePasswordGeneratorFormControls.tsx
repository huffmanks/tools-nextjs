import { useState } from "react";

import { generateKey } from "@/utils/generateKey";

import {
  type PasswordGeneratorValues,
  initialPasswordGeneratorValues,
} from "@/features/PasswordGenerator/constants";
import { generatePassword } from "@/features/PasswordGenerator/utils";

export const usePasswordGeneratorFormControls = () => {
  const [values, setValues] = useState<PasswordGeneratorValues>(initialPasswordGeneratorValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSlider = (_e: Event, newValue: number | number[]) => {
    setValues({
      ...values,
      slider: Number(newValue),
    });
  };

  const handleClick = () => {
    if (values.passwordType === "password") {
      const password = generatePassword(
        values.symbols,
        values.numbers,
        values.lowerCase,
        values.upperCase,
        values.excludeSimilar,
        values.slider
      );

      setValues({
        ...values,
        password,
      });
    }

    if (values.passwordType === "keygen") {
      const keygen = generateKey();

      setValues({
        ...values,
        keygen,
      });
    }
  };

  const handleShowPassword = () => {
    setValues((prev) => ({
      ...values,
      showPassword: !prev.showPassword,
    }));
  };

  return {
    values,
    handleChange,
    handleSlider,
    handleClick,
    handleShowPassword,
  };
};
