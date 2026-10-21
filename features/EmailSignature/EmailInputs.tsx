import { Grid, TextField } from "@mui/material";

import { emailInputs } from "@/features/EmailSignature/constants";
import type { EmailErrors, EmailSignatureValues } from "@/features/EmailSignature/types";

interface EmailInputsProps {
  values: EmailSignatureValues;
  errors: EmailErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const EmailInputs = ({ values, errors, handleChange, handleBlur }: EmailInputsProps) => {
  return (
    <>
      {emailInputs.map((field) => (
        <Grid key={field.name} item sm={field.gridSm} xs={12}>
          <TextField
            id={field.name}
            fullWidth
            variant="outlined"
            required={field.required ?? false}
            label={field.label}
            placeholder={field.placeholder}
            name={field.name}
            value={values[field.name]}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors[field.name]}
            autoComplete="none"
            {...(errors[field.name] && {
              error: true,
              helperText: errors[field.name],
            })}
          />
        </Grid>
      ))}
    </>
  );
};

export default EmailInputs;
