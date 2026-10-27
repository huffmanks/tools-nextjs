import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

import { conversionActionSelect } from "@/features/FileConverter/constants";
import type {
  ConversionWarning,
  FileConverterErrors,
  FileConverterValues,
} from "@/features/FileConverter/types";

interface FileConverterFormProps {
  values: FileConverterValues & { outputData: string };
  errors: FileConverterErrors;
  warnings: ConversionWarning[];
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDownload: () => void;
  handleReset: () => void;
}

const FileConverterForm = ({
  values,
  errors,
  warnings,
  handleChange,
  handleFileUpload,
  handleDownload,
  handleReset,
}: FileConverterFormProps) => {
  const [copy] = useCopyToClipboard(false);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box component="form" autoComplete="off" sx={{ width: "100%", paddingLeft: 3, paddingTop: 3 }}>
      <Grid container spacing={3}>
        <Grid container spacing={3} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControl fullWidth error={!!errors[conversionActionSelect.name]}>
              <InputLabel id={`${conversionActionSelect.name}-label`} shrink>
                {conversionActionSelect.label}
              </InputLabel>
              <Select
                labelId={`${conversionActionSelect.name}-label`}
                id={conversionActionSelect.name}
                variant="outlined"
                label={conversionActionSelect.label}
                name={conversionActionSelect.name}
                value={values[conversionActionSelect.name] || ""}
                onChange={handleChange}
                displayEmpty>
                <MenuItem value="" disabled>
                  <Typography variant="body2" color="text.secondary">
                    {conversionActionSelect.placeholder}
                  </Typography>
                </MenuItem>
                {conversionActionSelect.options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              startIcon={<FileUploadIcon />}
              sx={{ height: 56 }}>
              Upload Source File
              <input type="file" hidden onChange={handleFileUpload} />
            </Button>
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            id="inputData"
            className="global-scrollbar"
            fullWidth
            variant="filled"
            multiline
            minRows={isMdUp ? 16 : 8}
            maxRows={16}
            name="inputData"
            label="Source Data Input"
            placeholder="Paste raw text or upload a file..."
            value={values.inputData || ""}
            onChange={handleChange}
            error={!!errors.inputData}
            helperText={errors.inputData}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            id="outputData"
            className="global-scrollbar"
            fullWidth
            variant="filled"
            multiline
            minRows={isMdUp ? 16 : 8}
            maxRows={16}
            name="outputData"
            label="Converted Output"
            placeholder="Result will appear here..."
            value={values.outputData || ""}
            error={!!errors.outputData}
            helperText={errors.outputData}
            slotProps={{
              htmlInput: {
                readOnly: true,
              },
              input: {
                readOnly: true,
                disabled: !values.outputData,
                sx: { alignItems: "flex-start" },
                endAdornment: (
                  <InputAdornment position="end" sx={{ mt: -0.5, mr: -0.5 }}>
                    <IconButton
                      aria-label="copy output"
                      onClick={() => copy(values.outputData)}
                      disabled={!values.outputData}
                      size="small"
                      edge="end"
                      sx={{ "&:hover": { backgroundColor: "primary.main" } }}>
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              "& .MuiFilledInput-root": {
                backgroundColor: "action.hover",
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDownload}
            disabled={!values.outputData}
            startIcon={<DownloadIcon />}>
            Download File
          </Button>
          <Button variant="contained" onClick={handleReset} startIcon={<RefreshIcon />}>
            Reset
          </Button>
        </Grid>
      </Grid>

      {warnings.length > 0 && (
        <Grid size={{ xs: 12 }}>
          {warnings.map((warning, index) => (
            <Typography key={index} variant="body2" color="warning.main" sx={{ mt: 1 }}>
              ⚠️ {warning.message}
            </Typography>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FileConverterForm;
