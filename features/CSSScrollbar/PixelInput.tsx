import { InputAdornment, TextField } from "@mui/material";

interface PixelInputProps {
  inputLabel: string;
  inputName: string;
  inputValue: string | number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PixelInput = ({ inputLabel, inputName, inputValue, handleChange }: PixelInputProps) => {
  return (
    <>
      <TextField
        variant="outlined"
        label={inputLabel}
        name={inputName}
        value={inputValue}
        onChange={handleChange}
        autoComplete="none"
        slotProps={{
          htmlInput: {
            maxLength: 2,
          },
          input: {
            endAdornment: <InputAdornment position="end">px</InputAdornment>,
          },
        }}
        sx={{ width: "100%" }}
        helperText="2 digits"
      />
    </>
  );
};

export default PixelInput;
