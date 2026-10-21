import { useState } from "react";

import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import { useGlobalState } from "../../hooks/useGlobalState";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, InputAdornment, TextField } from "@mui/material";

interface ColorInputProps {
  inputLabel: string;
  inputName: string;
  colorType: string;
}

const ColorInput = ({ inputLabel, inputName, colorType }: ColorInputProps) => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState(colorType);

  const { addToast } = useGlobalState();
  const [copy] = useCopyToClipboard(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setActive(true);
    setValue(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setActive(false);
    setValue(colorType);
  };

  const handleCopy = async () => {
    const copySuccess = await copy(colorType);

    if (copySuccess) {
      addToast("Copied to clipboard!");
    }
  };

  return (
    <>
      <TextField
        fullWidth
        variant="outlined"
        label={inputLabel}
        name={inputName}
        value={active ? value : colorType}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete="none"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="copy value to clipboard" onClick={handleCopy} edge="end">
                <ContentCopyIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default ColorInput;
