import { variantColorPickerRadios } from "../../constants/colorPicker";

import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { ConvertedColors } from "./ColorForm";
import ColorItem from "./ColorItem";

interface ColorVariantsProps {
  convertedColors: ConvertedColors;
  tintType: string;
  handleTintType: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
}

const ColorVariants = ({ convertedColors, tintType, handleTintType }: ColorVariantsProps) => {
  return (
    <>
      <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
        <RadioGroup row defaultValue="hex" name="selectedType" value={tintType} onChange={handleTintType}>
          {variantColorPickerRadios.map(({ value, label }, index) => (
            <FormControlLabel
              key={index}
              value={value}
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: convertedColors.hexColor,
                    },
                  }}
                />
              }
              label={label}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 4,
          "@media (max-width: 500px)": {
            gridTemplateColumns: "1fr",
          },
        }}>
        <Box
          sx={{
            borderRadius: "15px",
            overflow: "hidden",
          }}>
          {convertedColors.tints.map((tint, index) => (
            <ColorItem key={index} textColor={convertedColors.textColor} colorValue={tint} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ColorVariants;
