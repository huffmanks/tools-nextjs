import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { FormGroup, IconButton, InputAdornment, TextField } from "@mui/material";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useGlobalState } from "@/hooks/useGlobalState";

import type { PasswordGeneratorValues } from "@/features/PasswordGenerator/types";

interface RandomKeyGensProps {
  values: PasswordGeneratorValues;
}

const RandomKeyGens = ({ values }: RandomKeyGensProps) => {
  const { addToast } = useGlobalState();
  const [copy] = useCopyToClipboard(false);

  const handleCopy = async (key: string) => {
    const copySuccess = await copy(key);

    if (copySuccess) {
      addToast("Copied to clipboard!");
    }
  };

  return (
    <>
      {values.keygen.map((key) => (
        <FormGroup key={key}>
          <TextField
            focused
            variant="outlined"
            type="text"
            value={key}
            autoComplete="none"
            sx={{
              maxWidth: "100%",
              width: 500,
              marginBottom: 5,
              "& input": {
                fontFamily: '"Roboto Mono", monospace',
                letterSpacing: {
                  xs: 2,
                  sm: 3,
                },
                fontSize: 18,
              },
            }}
            slotProps={{
              htmlInput: {
                readOnly: true,
              },
              input: {
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="copy value to clipboard"
                      onClick={() => handleCopy(key)}
                      edge="end">
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </FormGroup>
      ))}
    </>
  );
};

export default RandomKeyGens;
