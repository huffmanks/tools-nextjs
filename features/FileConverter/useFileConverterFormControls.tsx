import { useMemo, useState } from "react";

import type { SelectChangeEvent } from "@mui/material";

import { initialFileConverterValues } from "@/features/FileConverter/constants";
import type { FileConverterErrors, FileConverterValues } from "@/features/FileConverter/types";
import { dataTransformer, getFileExtension } from "@/features/FileConverter/utils";

export const useFileConverterFormControls = () => {
  const [values, setValues] = useState<FileConverterValues>(initialFileConverterValues);
  const [errors, setErrors] = useState<FileConverterErrors>({});

  const isStringEmpty = (str: string) => !str || !/\S/.test(str);

  const { outputData, conversionError } = useMemo(() => {
    if (isStringEmpty(values.inputData) || isStringEmpty(values.action)) {
      return { outputData: "", conversionError: "" };
    }

    try {
      const result = dataTransformer({
        inputData: values.inputData,
        action: values.action,
      });
      return { outputData: result, conversionError: "" };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to process conversion.";
      return { outputData: "", conversionError: message };
    }
  }, [values.inputData, values.action]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const name = e.target.name as keyof FileConverterValues;
    const value = e.target.value as string;
    if (!name) return;

    setErrors((prev) => ({ ...prev, [name]: "" }));
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setValues((prev) => ({
          ...prev,
          fileName: file.name.replace(/\.[^/.]+$/, ""),
          inputData: content,
        }));
      }
    };
    reader.readAsText(file);
  };

  const handleDownload = () => {
    if (!outputData) return;
    const extension = getFileExtension(values.action);
    const blob = new Blob([outputData], {
      type: `text/${extension === "json" ? "json" : "plain"};charset=utf-8`,
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${values.fileName || "converted"}-output.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setValues(initialFileConverterValues);
    setErrors({});
  };

  return {
    values: {
      ...values,
      outputData,
    },
    errors: {
      ...errors,
      outputData: conversionError,
    },
    handleChange,
    handleFileUpload,
    handleDownload,
    handleReset,
  };
};
