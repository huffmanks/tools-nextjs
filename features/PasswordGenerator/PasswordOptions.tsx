import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material";

import { type PasswordGeneratorValues, passwordGeneratorOptions } from "./constants";

interface PasswordOptionsProps {
  values: PasswordGeneratorValues;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordOptions = ({ values, handleChange }: PasswordOptionsProps) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" sx={{ marginBottom: 2 }}>
        Password Options
      </FormLabel>
      <FormGroup sx={{ marginBottom: 3 }}>
        {passwordGeneratorOptions.map((option) => (
          <FormControlLabel
            key={option.id}
            control={
              <Checkbox checked={values[option.name]} onChange={handleChange} name={option.name} />
            }
            label={option.label}
            labelPlacement="end"
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default PasswordOptions;
