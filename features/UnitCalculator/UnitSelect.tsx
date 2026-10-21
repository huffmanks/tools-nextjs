import { MenuItem, type SelectChangeEvent, TextField } from "@mui/material";

import { type UnitItems } from "@/features/UnitCalculator/constants";

interface UnitSelectProps {
  selectName: string;
  selectValue: string;
  changeHandler: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => void;
  unitList: UnitItems;
}

const UnitSelect = ({ selectName, selectValue, changeHandler, unitList }: UnitSelectProps) => {
  return (
    <>
      <TextField
        fullWidth
        select
        name={selectName}
        value={selectValue}
        onChange={changeHandler}
        sx={{
          "& fieldset": {
            borderTopLeftRadius: 0,
            borderTopRightRadius: {
              xs: 0,
              md: 4,
            },
            borderBottomLeftRadius: {
              xs: 4,
              md: 0,
            },
          },
        }}>
        {unitList.map((option) => (
          <MenuItem key={option.id} value={option.unit}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default UnitSelect;
