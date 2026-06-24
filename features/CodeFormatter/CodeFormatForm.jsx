import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { codeActionSelect, codeFormatSelect } from "../../constants/codeFormatter";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";

const CodeFormatForm = ({ values, errors, handleChange, handleReset }) => {
  const [copy] = useCopyToClipboard();
  const theme = useTheme();

  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isLanguageRequired = ["minify", "un-minify"].includes(values.action);

  return (
    <Box component="form" autoComplete="off" sx={{ width: "100%", paddingLeft: 3, paddingTop: 3 }}>
      <Grid container spacing={3}>
        <Grid item container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth error={!!errors[codeActionSelect.name]}>
              <InputLabel id={`${codeActionSelect.name}-label`} shrink>
                {codeActionSelect.label}
              </InputLabel>
              <Select
                labelId={`${codeActionSelect.name}-label`}
                id={codeActionSelect.name}
                variant="outlined"
                label={codeActionSelect.label}
                name={codeActionSelect.name}
                value={values[codeActionSelect.name] || ""}
                onChange={handleChange}
                displayEmpty>
                <MenuItem value="" disabled>
                  <Typography variant="body2" color="text.secondary">
                    {codeActionSelect.placeholder}
                  </Typography>
                </MenuItem>
                {codeActionSelect.options.map((option) => (
                  <MenuItem key={option.label} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {errors[codeActionSelect.name] && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                  {errors[codeActionSelect.name]}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth disabled={!isLanguageRequired} error={!!errors[codeFormatSelect.name]}>
              <InputLabel id={`${codeFormatSelect.name}-label`} shrink>
                {codeFormatSelect.label}
              </InputLabel>
              <Select
                labelId={`${codeFormatSelect.name}-label`}
                id={codeFormatSelect.name}
                variant="outlined"
                label={codeFormatSelect.label}
                name={codeFormatSelect.name}
                value={values[codeFormatSelect.name] || ""}
                onChange={handleChange}
                displayEmpty>
                {!isLanguageRequired ? (
                  <MenuItem value="">
                    <Typography variant="caption" color="text.secondary">
                      Not required for this action
                    </Typography>
                  </MenuItem>
                ) : (
                  [
                    <MenuItem value="" disabled key="placeholder">
                      <Typography variant="body2" color="text.secondary">
                        {codeFormatSelect.placeholder}
                      </Typography>
                    </MenuItem>,
                    ...codeFormatSelect.options.map((option) => (
                      <MenuItem key={option.label} value={option.value}>
                        {option.label}
                      </MenuItem>
                    )),
                  ]
                )}
              </Select>
              {errors[codeFormatSelect.name] && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                  {errors[codeFormatSelect.name]}
                </Typography>
              )}
            </FormControl>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="codeInput"
            className="global-scrollbar"
            fullWidth
            variant="filled"
            multiline
            minRows={isMdUp ? 16 : 8}
            maxRows={16}
            name="codeInput"
            label="Code Input"
            placeholder="Insert the code here"
            value={values.codeInput || ""}
            onChange={handleChange}
            error={!!errors.codeInput}
            helperText={errors.codeInput}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="codeOutput"
            className="global-scrollbar"
            fullWidth
            variant="filled"
            multiline
            minRows={isMdUp ? 16 : 8}
            maxRows={16}
            name="codeOutput"
            label="Code Output"
            placeholder="Result will appear here"
            value={values.codeOutput || ""}
            error={!!errors.codeOutput}
            helperText={errors.codeOutput}
            InputProps={{
              readOnly: true,
              disabled: values.codeOutput ? false : true,
              sx: {
                alignItems: "flex-start",
              },
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    mt: -0.5,
                    mr: -0.5,
                  }}>
                  <IconButton
                    aria-label="copy output"
                    onClick={() => copy(values.codeOutput)}
                    disabled={!values.codeOutput}
                    size="small"
                    edge="end"
                    sx={{
                      "&:hover": {
                        backgroundColor: "primary.main",
                      },
                    }}>
                    <ContentCopyIcon fontSize="1rem" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiInputBase-input": {
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
                wordBreak: "break-all",
              },
              "& .MuiFilledInput-root": {
                backgroundColor: "action.hover",
              },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CodeFormatForm;
