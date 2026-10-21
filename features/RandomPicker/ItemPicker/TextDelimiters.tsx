import { delimiterOptions, delimiterSelects, ItemPickerValues } from "./constants";

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";

interface TextDelimitersProps {
  values: ItemPickerValues;
  handleChange: (e: SelectChangeEvent<string>) => void;
}

const TextDelimiters = ({ values, handleChange }: TextDelimitersProps) => {
  return (
    <Stack direction={{ xs: "column", xms: "row" }} gap={2} sx={{ flex: 1, maxWidth: "100%" }}>
      {delimiterSelects.map((select, i) => (
        <FormControl key={select.label} variant="outlined" sx={{ width: "100%" }}>
          <InputLabel>{select.label}</InputLabel>
          <Select label={select.label} name={select.value} value={values[select.value] || ""} onChange={handleChange}>
            {delimiterOptions.map((option, j) => (
              <MenuItem key={j} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </Stack>
  );
};

export default TextDelimiters;
