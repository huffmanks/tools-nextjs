import { unitCalculatorMeasurements } from "../../constants/unitCalculator";

import { MenuItem, TextField } from "@mui/material";

import InputContainer from "./InputContainer";
import NumberInput from "./NumberInput";
import UnitSelect from "./UnitSelect";

const UnitInputs = ({ values, currentUnits, handleChange, handleFocus }) => {
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
