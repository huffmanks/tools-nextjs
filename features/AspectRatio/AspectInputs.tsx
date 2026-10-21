import { Fragment } from "react";

import { aspectInputs, AspectRatioErrors, AspectRatioValues } from "./constants";

import { Chip, Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";

interface AspectInputsProps {
  values: AspectRatioValues;
  errors: AspectRatioErrors;
  handleFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => void;
  handleBlur: () => void;
}

const AspectInputs = ({ values, errors, handleFocus, handleChange, handleBlur }: AspectInputsProps) => {
  return (
    <>
      {aspectInputs.map((input, index) => (
        <Fragment key={index}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              label={
                input.isDynamic
                  ? values.selectedType.charAt(0).toUpperCase() + values.selectedType.slice(1)
                  : input.label
              }
              placeholder={input.placeholder}
              name={input.name}
              value={values[input.name]}
              onFocus={handleFocus}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors[input.name]}
              helperText={errors[input.name]}
              autoComplete="none"
            />
          </Grid>

          {index === 1 && (
            <>
              <Grid item xs={12}>
                <Divider sx={{ margin: "2rem 0" }} />
              </Grid>
              <Grid item xs={12}>
                <Chip label="New" color="primary" component="div" sx={{ marginBottom: "2rem" }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                  <RadioGroup
                    defaultValue="width"
                    name="selectedType"
                    value={values.selectedType}
                    onChange={handleChange}>
                    <FormControlLabel value="width" control={<Radio color="primary" />} label="Width" />
                    <FormControlLabel value="height" control={<Radio color="primary" />} label="Height" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </>
          )}
        </Fragment>
      ))}
    </>
  );
};

export default AspectInputs;
