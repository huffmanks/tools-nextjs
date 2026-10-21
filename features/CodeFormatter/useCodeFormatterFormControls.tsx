import { useEffect, useRef, useState } from "react";

import { SelectChangeEvent } from "@mui/material";
import { CodeFormatterValues, initialCodeFormatterValues } from "./constants";
import { codeTransformer, detectFormat } from "./utils";

export interface CodeFormatterErrors {
  codeInput?: string;
  action?: string;
  format?: string;
  codeOutput?: string;
  [key: string]: string | undefined;
}

export const useCodeFormatterFormControls = () => {
  const [values, setValues] = useState<CodeFormatterValues>(initialCodeFormatterValues);
  const [errors, setErrors] = useState<CodeFormatterErrors>({});

  const isManualOverride = useRef(false);

  const isStringEmpty = (str: string) => !str || !/\S/.test(str);

  useEffect(() => {
    if (isStringEmpty(values.codeInput) || isStringEmpty(values.action)) {
      setValues((prev) => ({ ...prev, codeOutput: "" }));
      return;
    }

    const isLanguageRequired = ["minify", "un-minify"].includes(values.action);
    let currentFormat = values.format;

    if (isLanguageRequired) {
      const autoDetected = detectFormat(values.codeInput);

      if (!isManualOverride.current) {
        if (autoDetected !== values.format) {
          currentFormat = autoDetected;
          setValues((prev) => ({ ...prev, format: autoDetected }));
        }
      } else if (values.format === "") {
        isManualOverride.current = false;
      }
    }

    if (isLanguageRequired && isStringEmpty(currentFormat)) {
      return;
    }

    try {
      const result = codeTransformer({
        codeInput: values.codeInput,
        format: currentFormat,
        action: values.action,
      });

      setValues((prev) => ({ ...prev, codeOutput: result }));
      setErrors((prev) => ({ ...prev, codeOutput: "" }));
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        codeOutput: err.message || "Invalid format processing error.",
      }));
      setValues((prev) => ({ ...prev, codeOutput: "" }));
    }
  }, [values.codeInput, values.format, values.action]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element> | SelectChangeEvent<string>,
  ) => {
    const name = e.target.name as keyof CodeFormatterValues;
    const value = e.target.value as string;
    if (!name) return;

    setErrors((prev) => ({ ...prev, [name]: "", codeOutput: "" }));

    if (name === "codeInput") {
      isManualOverride.current = false;
    }

    if (name === "format") {
      isManualOverride.current = true;
    }

    setValues((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "action" && !["minify", "un-minify"].includes(value) && { format: "" }),
    }));
  };

  const handleReset = () => {
    isManualOverride.current = false;
    setValues(initialCodeFormatterValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    handleReset,
  };
};
