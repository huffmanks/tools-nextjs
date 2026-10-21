import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";

interface TextareaProps {
  output: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleClear: () => void;
}

const Textarea = ({ output, handleChange, handleClear }: TextareaProps) => {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="filled"
          label="Insert Text"
          name="output"
          value={output}
          onFocus={(e) => e.target.select()}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="clear input" onClick={handleClear} edge="start">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </>
  );
};

export default Textarea;
