import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { firefoxWidthSelect } from "./constants";

interface ScrollbarSelectProps {
  selectGroup: "firefoxWidthSelect";
  groupLabel: string;
  ariaLabel: string;
  groupName: string;
  defaultValue: string;
  groupValue: string;
  handleChange: (event: SelectChangeEvent<string>) => void;
}

const ScrollbarSelect = ({
  selectGroup,
  groupLabel,
  ariaLabel,
  groupName,
  defaultValue,
  groupValue,
  handleChange,
}: ScrollbarSelectProps) => {
  const selectLists = { firefoxWidthSelect };
  const selectArr = selectLists[selectGroup];

  return (
    <>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id={ariaLabel}>{groupLabel}</InputLabel>
        <Select
          labelId={ariaLabel}
          name={groupName}
          defaultValue={defaultValue}
          value={groupValue}
          label={groupLabel}
          onChange={handleChange}>
          {selectArr.map(({ value, label }, index) => (
            <MenuItem key={index} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default ScrollbarSelect;
