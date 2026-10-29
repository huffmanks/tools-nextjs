import { useState } from "react";

import type { InitialColors } from "@/constants/popoverColorPicker";

export function usePopoverColorPicker(initialValues: InitialColors) {
  const [colors, setColors] = useState(initialValues);

  const handleBlur = (name: string, color: string) => {
    setColors({
      ...colors,
      [name]: color,
    });
  };

  return {
    colors,
    handleBlur,
  };
}
