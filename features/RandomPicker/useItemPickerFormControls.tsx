import { useRef, useState } from "react";
import * as XLSX from "xlsx";

import { useGlobalState } from "../../hooks/useContext";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";

import { generateRandomNumbers } from "../../utilities/generateRandomNumbers";
import { generateSeparatedStrings } from "./generateSeparatedStrings";

import { ITEM_PICKER_LS_KEY, initialValues } from "../../constants/itemPicker";
import { useLocalStorage } from "../../hooks/useLocalStorage";

type SpreadsheetRow = unknown[];

export const useItemPickerFormControls = () => {
  const [values, setValues] = useLocalStorage(ITEM_PICKER_LS_KEY, initialValues);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { addToast } = useGlobalState();
  const [copy] = useCopyToClipboard(true);

  const fileRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;

    if (errorMessage) {
      setErrorMessage("");
    }
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    if (name === "list") {
      setValues({
        ...values,
        list: value.replace(/\n\s*\n/g, "\n").trim(),
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    setValues({
      ...values,
      isProcessing: true,
    });

    reader.onload = (loadEvent: ProgressEvent<FileReader>): void => {
      if (!(loadEvent.target?.result instanceof ArrayBuffer)) {
        setValues({
          ...values,
          isProcessing: false,
        });
        return;
      }

      const data = new Uint8Array(loadEvent.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];

      if (!sheetName) {
        setValues({
          ...values,
          isProcessing: false,
        });
        return;
      }

      const worksheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json<SpreadsheetRow>(worksheet, { header: 1 });

      setValues({
        ...values,
        fileName: file.name,
        selectedRows: rows,
        isProcessing: false,
      });
    };

    reader.readAsArrayBuffer(file);
  };

  const handleRandomSelection = (event) => {
    event.preventDefault();

    const headerRow = values.selectedRows[0];
    const dataRows = values.selectedRows.slice(1);

    const shuffledRows = [...dataRows].sort(() => Math.random() - Math.random());
    const selected = [];
    const selectedSet = new Set();

    for (const row of shuffledRows) {
      if (!selectedSet.has(JSON.stringify(row))) {
        selected.push(row);
        selectedSet.add(JSON.stringify(row));
      }

      if (selected.length >= values.total) {
        break;
      }
    }

    const outputRows = [headerRow, ...selected];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(outputRows);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Rows");

    XLSX.writeFile(workbook, "selected_rows.xlsx");
  };

  const handleClick = () => {
    const items = generateSeparatedStrings(values);

    if (items.isError) return setErrorMessage(items.message);

    const lines = items.length;

    const randomNumbers = generateRandomNumbers({
      total: values.total,
      lowerNumber: 1,
      higherNumber: lines,
      unique: true,
    }).map((number) => number - 1);

    const output = items.filter((_: unknown, i: number) => randomNumbers.includes(i));

    setValues({
      ...values,
      output,
    });
  };

  const handleCopy = async () => {
    const copySuccess = await copy(resultRef.current);

    if (copySuccess) {
      addToast("Copied to clipboard!");
    }
  };

  const handleReset = () => {
    setValues(initialValues);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
    setErrorMessage("");
  };

  return {
    fileRef,
    resultRef,
    values,
    errorMessage,
    setValues,
    handleChange,
    handleBlur,
    handleFileUpload,
    handleRandomSelection,
    handleClick,
    handleCopy,
    handleReset,
  };
};
