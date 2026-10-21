import { Box } from "@mui/material";

import ColorInput from "@/features/ColorPicker/ColorInput";
import type { ConvertedColors } from "@/features/ColorPicker/types";

interface ColorFormProps {
  convertedColors: ConvertedColors;
  handleColor: (e: React.ChangeEvent<HTMLFormElement, Element>) => void;
}

const ColorForm = ({ convertedColors, handleColor }: ColorFormProps) => {
  return (
    <Box
      component="form"
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(auto-fit, minmax(210px, 1fr))",
        },
        gap: 2,
      }}
      autoComplete="off"
      onChange={handleColor}>
      <ColorInput inputLabel="HEX" inputName="hexColor" colorType={convertedColors.hexColor} />
      <ColorInput inputLabel="RGB" inputName="rgbColor" colorType={convertedColors.rgbColor} />
      <ColorInput inputLabel="HSL" inputName="hslColor" colorType={convertedColors.hslColor} />
      <ColorInput inputLabel="Color" inputName="nameColor" colorType={convertedColors.nameColor} />
    </Box>
  );
};

export default ColorForm;
