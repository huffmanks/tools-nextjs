import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";

import type { SelectChangeEvent } from "@mui/material";

import { initialFileConverterValues } from "@/features/FileConverter/constants";
import type { FileConverterErrors, FileConverterValues } from "@/features/FileConverter/types";
import { convertData, getFormatDefinition, isFormatId } from "@/features/FileConverter/utils";

export const useFileConverterFormControls = () => {
  const [values, setValues] = useState<FileConverterValues>(initialFileConverterValues);
  const [errors, setErrors] = useState<FileConverterErrors>({});

  const { outputData, conversionError, warnings, outputFormat } = useMemo(() => {
    const { inputData, sourceFormat, action, inputFileName } = values;

    if (
      (typeof inputData === "string" && !/\S/.test(inputData)) ||
      (inputData instanceof ArrayBuffer && inputData.byteLength === 0) ||
      !action ||
      !isFormatId(action)
    ) {
      return {
        outputData: "",
        conversionError: "",
        warnings: [],
        outputFormat: null,
      };
    }

    try {
      const result = convertData(inputData, {
        sourceFormat,
        targetFormat: action,
        fileName: inputFileName || undefined,
      });

      return {
        outputData: result.output,
        conversionError: "",
        warnings: result.warnings,
        outputFormat: result.outputFormat,
      };
    } catch (error: unknown) {
      return {
        outputData: "",
        conversionError: error instanceof Error ? error.message : "Failed to process conversion.",
        warnings: [],
        outputFormat: null,
      };
    }
  }, [values]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    if (!name) return;

    const field = name as keyof FileConverterValues;

    setErrors((previous) => ({ ...previous, [field]: "" }));
    setValues((previous) => ({ ...previous, [field]: value }));
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const extension = `.${file.name.split(".").pop()?.toLowerCase() ?? ""}`;

      const knownFormat = [
        "csv",
        "tsv",
        "xlsx",
        "xml",
        "json",
        "markdown-table",
        "html-table",
        "toml",
        "yaml",
      ].find((format) =>
        getFormatDefinition(
          format as Parameters<typeof getFormatDefinition>[0]
        ).extensions.includes(extension)
      );

      const inputData = knownFormat === "xlsx" ? await file.arrayBuffer() : await file.text();

      setValues((previous) => ({
        ...previous,
        inputData,
        inputFileName: file.name,
        fileName: file.name.replace(/\.[^/.]+$/, ""),
        sourceFormat: knownFormat
          ? (knownFormat as FileConverterValues["sourceFormat"])
          : values.sourceFormat,
      }));

      setErrors({});
    } catch {
      setErrors((previous) => ({
        ...previous,
        inputData: "Unable to read this file.",
      }));
    } finally {
      event.target.value = "";
    }
  };

  const handleDownload = () => {
    if (!outputData || !outputFormat) return;

    const definition = getFormatDefinition(outputFormat);

    const blob = definition.binary
      ? new Blob([Uint8Array.from(atob(outputData), (character) => character.charCodeAt(0))], {
          type: definition.mimeType,
        })
      : new Blob([outputData], { type: definition.mimeType });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${values.fileName || "converted"}-output.${definition.extensions[0]!.slice(1)}`;

    document.body.appendChild(link);
    link.click();
    link.remove();
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
    warnings,
    handleChange,
    handleFileUpload,
    handleDownload,
    handleReset,
  };
};
