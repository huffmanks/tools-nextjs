import { useEffect, useState } from "react";

import { initialValues } from "../../constants/codeFormatter";
import { codeTransformer } from "./codeTransformer";

export const useCodeFormatterFormControls = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const isStringEmpty = (str) => !str || !/\S/.test(str);

  useEffect(() => {
    const isLanguageRequired = ["minify", "un-minify"].includes(values.action);

    if (
      isStringEmpty(values.codeInput) ||
      isStringEmpty(values.action) ||
      (isLanguageRequired && isStringEmpty(values.format))
    ) {
      setValues((prev) => ({ ...prev, codeOutput: "" }));
      return;
    }
    try {
      const result = codeTransformer({
        codeInput: values.codeInput,
        format: values.format,
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

  const validate = () => {
    let tempErrors = {};
    const isLanguageRequired = ["minify", "un-minify"].includes(values.action);

    if (isStringEmpty(values.codeInput)) {
      tempErrors.codeInput = "Code input is required.";
    }
    if (isStringEmpty(values.action)) {
      tempErrors.action = "Please select an action.";
    }
    if (isLanguageRequired && isStringEmpty(values.format)) {
      tempErrors.format = "Please select a code format.";
    }

    setErrors((prev) => ({ ...prev, ...tempErrors }));
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors((prev) => ({ ...prev, [name]: "", codeOutput: "" }));

    setValues((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "action" && !["minify", "un-minify"].includes(value) && { format: "" }),
    }));
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    handleReset,
  };
};
