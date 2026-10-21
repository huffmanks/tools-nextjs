import { useState } from "react";

import type { SelectChangeEvent } from "@mui/material";

import { initialCssScrollbarValues } from "@/features/CSSScrollbar/constants";
import type { InitialCssScrollbarValues } from "@/features/CSSScrollbar/types";

export const useCSSScrollbarFormControls = () => {
  const [values, setValues] = useState<InitialCssScrollbarValues>(initialCssScrollbarValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;

    if (!name) return;

    if (
      name === "thickness" ||
      name === "trackRadius" ||
      name === "trackBorderWidth" ||
      name === "thumbRadius" ||
      name === "thumbBorderWidth"
    ) {
      setValues((prev) => ({
        ...prev,
        [name]:
          prev[name as keyof InitialCssScrollbarValues] === "" && Number(value) === 0
            ? ""
            : value.replace(/[^0-9]/g, ""),
      }));
    } else if (name === "axis") {
      setValues({
        ...values,
        [name]: value,
        thickness: 10,
      });
    } else {
      setValues({
        ...values,
        [name]: name === "isTrackTransparent" ? !values.isTrackTransparent : value,
      });
    }
  };

  return {
    values,
    handleChange,
  };
};
