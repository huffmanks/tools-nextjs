import { MenuItem, type SelectChangeEvent, TextField } from "@mui/material";

import InputContainer from "./InputContainer";
import NumberInput from "./NumberInput";
import UnitSelect from "./UnitSelect";
import { type UnitCalculatorValues, type UnitItems, unitCalculatorMeasurements } from "./constants";

interface UnitInputsProps {
  values: UnitCalculatorValues;
  currentUnits: UnitItems;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => void;
  handleFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const UnitInputs = ({ values, currentUnits, handleChange, handleFocus }: UnitInputsProps) => {
  return (
    <>
      <InputContainer
        top={
          <TextField
            fullWidth
            select
            label="Measurement"
            value={values.measurement}
            name="measurement"
            onChange={handleChange}>
            {unitCalculatorMeasurements.map((option) => (
              <MenuItem key={option.id} value={option.type}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        }
        center={
          <NumberInput
            inputLabel="Number"
            inputName="numInput"
            inputValue={values.numInput}
            focusHandler={handleFocus}
            changeHandler={handleChange}
          />
        }
        bottom={
          <UnitSelect
            selectName="unitSelection"
            selectValue={values.unitSelection}
            changeHandler={handleChange}
            unitList={currentUnits}
          />
        }
      />
    </>
  );
};

export default UnitInputs;
