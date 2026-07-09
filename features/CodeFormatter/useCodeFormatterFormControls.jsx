import { useEffect, useRef, useState } from "react";

import { initialValues } from "../../constants/codeFormatter";
import { codeTransformer, detectFormat } from "./codeTransformer";

export const useCodeFormatterFormControls = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const isManualOverride = useRef(false);

  const isStringEmpty = (str) => !str || !/\S/.test(str);

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
