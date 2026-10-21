import { startTransition, useMemo, useState } from "react";

import { generateColorVariants } from "./generateColorVariants";

import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
extend([namesPlugin]);

export const useColorPickerFormControls = () => {
  const [color, setColor] = useState("#5b21b6");
  const [tintType, setTintType] = useState("hex");

  const handleColor = (e: React.ChangeEvent<HTMLFormElement>) => {
    const target = e.target as unknown as HTMLInputElement;
    if (target?.value) {
      startTransition(() => {
        setColor(target.value);
      });
    }
  };

  const handleTintType = (_e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setTintType(value);
  };

  const convertedColors = useMemo(() => {
    const tints = generateColorVariants(color, tintType);
    return {
      hexColor: colord(color).toHex(),
      rgbColor: colord(color).toRgbString(),
      hslColor: colord(color).toHslString(),
      nameColor: colord(color).toName({ closest: true }),
      badgeColor: `linear-gradient(to right, ${colord(color).lighten(0.15).toHex()}, ${colord(color).darken(0.15).toHex()})`,
      textColor: colord(color).isDark() ? "text.primary" : "background.paper",
      tintType,
      tints,
    };
  }, [color, tintType]);

  const handlePickerChange = (newColor: string) => {
    startTransition(() => {
      setColor(newColor);
    });
  };

  return {
    color,
    convertedColors,
    tintType,
    setColor: handlePickerChange,
    handleColor,
    handleTintType,
  };
};
