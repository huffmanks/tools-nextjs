import { useEffect, useState } from "react";

import { useGlobalState } from "../../hooks/useContext";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import { TEXT_FORMATTER_LS_KEY, checkAllValues, checkNoneValues, initialValues } from "../../constants/textFormatter";
import { uniqueId } from "../../utilities/uniqueId";
import { formatTextCases } from "./helpers";

export const useTextFormatterFormControls = () => {
  const [values, setValues] = useLocalStorage(TEXT_FORMATTER_LS_KEY, initialValues);
  const [checkedCards, setCheckedCards] = useState([]);
  const [checkAll, setCheckAll] = useState(false);

  const uid = uniqueId();
  const { addToast } = useGlobalState();
  const [copy] = useCopyToClipboard();

  const currentSaved = values?.saved || [];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setValues({
        ...values,
        [name]: checked,
      });
    }

    if (name === "output" || name === "selectedId") {
      const isSelect = name === "selectedId";
      const targetText = isSelect ? currentSaved.find((i) => i.id === value)?.value || "" : value;

      setValues({
        ...values,
        output: targetText,
        selectedId: isSelect ? value : "",
        ...formatTextCases(targetText),
      });
    }
  };

  const handleCheckAll = () => {
    setCheckAll((prev) => !prev);
    setValues((prev) => ({
      ...prev,
      ...(!checkAll ? checkAllValues : checkNoneValues),
    }));
  };

  const handleCopy = async (name) => {
    const copySuccess = await copy(values[name]);

    if (copySuccess) {
      addToast("Copied to clipboard!");
    }
  };

  const handleReset = () => {
    setValues(initialValues);
  };

  const handleSave = () => {
    if (!values.saved.some((item) => item.value === values.output)) {
      const newId = uid;

      setValues({
        ...values,
        selectedId: newId,
        saved: [
          ...values.saved,
          {
            id: newId,
            value: values.output,
            label: values.output,
          },
        ],
      });

      addToast("Item saved for later!");
    }
  };

  const handleClear = () => {
    setValues({
      ...values,
      output: "",
      selectedId: "",
    });
  };

  const handleDeleteSaved = (savedId) => {
    const isCurrentActiveSelection = values?.selectedId === savedId;

    if (isCurrentActiveSelection) {
      setValues({
        ...values,
        selectedId: "",
        output: "",
      });
    }

    setTimeout(() => {
      setValues((currentValues) => ({
        ...currentValues,
        saved: (currentValues?.saved || []).filter((item) => item.id !== savedId),
      }));
    }, 0);
  };

  useEffect(() => {
    if (!values) return;

    const filtered = Object.fromEntries(Object.entries(values).filter(([key, value]) => key.startsWith("check_") && value === true));

    const filtArr = Object.keys(filtered).map((item) => item.replace("check_", ""));

    setCheckedCards(filtArr);
  }, [values]);

  return { values, checkedCards, checkAll, handleChange, handleSave, handleCheckAll, handleCopy, handleClear, handleReset, handleDeleteSaved };
};
