import { useState } from "react";

import { useGlobalState } from "../../hooks/useContext";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";

import { checkAllValues, checkNoneValues, initialValues } from "../../constants/ipsum";
import { generateFormats, getCheckedElements } from "./generate-formats";

export const useIpsumFormControls = () => {
  const [values, setValues] = useState(initialValues);
  const [checkAll, setCheckAll] = useState(false);

  const { addToast } = useGlobalState();
  const [copy] = useCopyToClipboard();

  const handleChange = (e) => {
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
      ...(!checkAll ? checkAllValues : checkNoneValues),
    }));
  };

  const handleCopy = async (textToCopy) => {
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
      console.error("Failed to copy generated ipsum layout: ", err);
    }
  };

  const handleReset = () => {
    setValues(initialValues);
  };

  function handleSubmit(e) {
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
