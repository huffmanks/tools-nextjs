import { useGlobalState } from "../../hooks/useContext";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";

import { aspectOutput } from "../../constants/aspectRatio";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Divider, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Fragment } from "react";

const AspectValues = ({ values, errors }) => {
  const { addToast } = useGlobalState();
  const [copy] = useCopyToClipboard();

  const handleCopy = async (name) => {
    const copySuccess = await copy(name);

    if (copySuccess) {
      addToast("Copied to clipboard!");
    }
  };

  return (
    <>
      {aspectOutput.map((output, index) => (
        <Fragment key={output.name}>
          {index === 4 && (
            <Grid item xs={12}>
              <Divider component="div" role="presentation">
                <Typography>Suggested Rounded Dimensions</Typography>
              </Divider>
            </Grid>
          )}

          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              focused
              readOnly
              variant="outlined"
              sx={{
                ...(!!errors[output.name] && {
                  "& input::placeholder": {
                    color: "#f44336",
                    opacity: 1,
                    fontSize: 14,
                  },
                }),
              }}
              label={output.label}
              name={output.name}
              placeholder={!!errors[output.name] ? errors[output.name] : output.placeholder}
              value={values[output.name]}
              autoComplete="none"
              error={!!errors[output.name]}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    {values[output.name] && (
                      <IconButton aria-label="copy value to clipboard" onClick={() => handleCopy(values[output.name])} edge="end">
                        <ContentCopyIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Fragment>
      ))}
    </>
  );
};

export default AspectValues;
