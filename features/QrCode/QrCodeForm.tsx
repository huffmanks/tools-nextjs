import { Box, Container, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

import { qrCodePickers } from "../../constants/popoverColorPicker";
import { qrCodeInputs, qrCodeSelects } from "../../constants/qrCode";

import PopoverColorPicker from "../../components/common/PopoverColorPicker";
import ActionGroup from "./ActionGroup";
import LogoUpload from "./LogoUpload";

type QrCodeValues = {
  colors: {
    dotColor: string;
    backgroundColor: string;
    ringOuter: string;
    ringInner: string;
  };
  qrCodeName: string;
  websiteLink: string;
  outputSize: number;
  correctLevel: number;
  logoBackgroundTransparent: boolean;
  logoUpload: string;
  logoName: string;
};

type QrCodeErrors = Partial<Record<keyof QrCodeValues, string>>;

type QrCodeFormProps = {
  values: QrCodeValues;
  errors: QrCodeErrors;
  downloadUrl: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (name: string, value: string) => void;
  handleSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
  handleReset: () => void;
};

const QrCodeForm = ({
  values,
  errors,
  downloadUrl,
  handleChange,
  handleBlur,
  handleSubmit,
  handleReset,
}: QrCodeFormProps) => {
  return (
    <Container maxWidth="sm" disableGutters sx={{ margin: 0 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        autoComplete="off"
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {qrCodeInputs.map((input) => (
          <TextField
            key={input.name}
            type="text"
            fullWidth
            variant="outlined"
            label={input.label}
            placeholder={input.placeholder}
            name={input.name}
            value={values[input.name]}
            onChange={handleChange}
            autoComplete="none"
            error={!!errors[input.name]}
            helperText={errors[input.name]}
          />
        ))}

        {qrCodeSelects.map((input) => (
          <FormControl key={input.name} fullWidth>
            <InputLabel id={`${input.name}-label`}>{input.label}</InputLabel>
            <Select
              labelId={`${input.name}-label`}
              id={input.name}
              variant="outlined"
              label={input.label}
              name={input.name}
              value={values[input.name] || ""}
              onChange={handleChange}>
              {input.options.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}

        <Box
          sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, alignItems: "end", gap: 3 }}>
          {qrCodePickers.map((picker) => (
            <PopoverColorPicker
              key={picker.name}
              label={picker?.label}
              name={picker.name}
              value={values.colors?.[picker.name] || ""}
              helperText={picker?.helperText}
              handleBlur={handleBlur}
            />
          ))}
        </Box>

        <LogoUpload
          logoBackgroundTransparent={values.logoBackgroundTransparent}
          logoName={values.logoName}
          handleChange={handleChange}
        />

        <ActionGroup values={values} downloadUrl={downloadUrl} handleReset={handleReset} />
      </Box>
    </Container>
  );
};

export default QrCodeForm;
