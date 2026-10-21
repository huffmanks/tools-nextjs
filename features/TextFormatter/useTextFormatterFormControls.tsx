import { useMemo, useState } from "react";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useGlobalState } from "@/hooks/useGlobalState";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { uniqueId } from "@/utils/uniqueId";

import {
  TEXT_FORMATTER_LS_KEY,
  initialTextFormatterValues,
  textFormatterCheckAllValues,
  textFormatterCheckNoneValues,
} from "@/features/TextFormatter/constants";
import type { SavedItem, TextFormatterValues } from "@/features/TextFormatter/types";
import { formatTextCases } from "@/features/TextFormatter/utils";

export const useTextFormatterFormControls = () => {
  const [values, setValues] = useLocalStorage<TextFormatterValues>(
    TEXT_FORMATTER_LS_KEY,
    initialTextFormatterValues
  );
  const [checkAll, setCheckAll] = useState(false);

  const uid = uniqueId();
  const { addToast } = useGlobalState();
  const [copy] = useCopyToClipboard(false);

  const currentSaved: SavedItem[] = (values?.saved as SavedItem[]) || [];

  const checkedCards = useMemo(() => {
    if (!values) return [];

    const filtered = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => key.startsWith("check_") && value === true)
    );

    return Object.keys(filtered).map((item) => item.replace("check_", ""));
  }, [values]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

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
      ...(!checkAll ? textFormatterCheckAllValues : textFormatterCheckNoneValues),
    }));
  };

  const handleCopy = async (name: string) => {
    const copySuccess = await copy(String(values[name]));

    if (copySuccess) {
      addToast("Copied to clipboard!");
    }
  };

  const handleReset = () => {
    setValues(initialTextFormatterValues);
  };

  const handleSave = () => {
    if (!values.saved.some((item: SavedItem) => item.value === values.output)) {
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

  const handleDeleteSaved = (savedId: string) => {
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

  return {
    values,
    checkedCards,
    checkAll,
    handleChange,
    handleSave,
    handleCheckAll,
    handleCopy,
    handleClear,
    handleReset,
    handleDeleteSaved,
  };
};
