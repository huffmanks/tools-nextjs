import { useState } from "react";

import { useGlobalState } from "../../hooks/useGlobalState";

import {
  initialMockContentValues,
  mockContentCheckAllValues,
  mockContentCheckNoneValues,
  MockContentValues,
} from "../../constants/mockContent";
import { generateFormats, getCheckedElements } from "./generate-formats";

export const useMockContentFormControls = () => {
  const [values, setValues] = useState<MockContentValues>(initialMockContentValues);
  const [checkAll, setCheckAll] = useState(false);

  const { addToast } = useGlobalState();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCheckAll = () => {
    setCheckAll((prev) => !prev);
    setValues((prev) => ({
      ...prev,
      ...(!checkAll ? mockContentCheckAllValues : mockContentCheckNoneValues),
    }));
  };

  const handleCopy = async (textToCopy: string) => {
    if (!textToCopy) return;

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
        addToast("Copied to clipboard!");
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;

        textarea.style.position = "fixed";
        textarea.style.top = "0";
        textarea.style.left = "0";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);
        textarea.select();

        const successful = document.execCommand("copy");
        document.body.removeChild(textarea);

        if (successful) {
          addToast("Copied to clipboard!");
        } else {
          throw new Error("execCommand returned false");
        }
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleReset = () => {
    setValues(initialMockContentValues);
  };

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!values) return;

    const activeElements = getCheckedElements(values);

    if (activeElements.length === 0) {
      setValues((prev) => ({ ...prev, output: { html: "", markdown: "", plaintext: "" } }));
      return;
    }

    const generatedBundle = generateFormats(activeElements, values.tableDataType);
    setValues((prev) => ({ ...prev, output: generatedBundle }));
  }

  return { values, checkAll, handleChange, handleCheckAll, handleCopy, handleReset, handleSubmit };
};
