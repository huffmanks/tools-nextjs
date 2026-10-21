import DesignServicesIcon from "@mui/icons-material/DesignServices";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Box, Button, Grid, Stack } from "@mui/material";

import EmailInputs from "@/features/EmailSignature/EmailInputs";
import type { EmailErrors, EmailSignatureValues } from "@/features/EmailSignature/types";

import PopoverColorPicker from "@/components/common/PopoverColorPicker";

interface EmailFormProps {
  values: EmailSignatureValues;
  errors: EmailErrors;
  formIsValid: (fieldValues?: Partial<EmailSignatureValues>) => boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleColorChange: (name?: string, colorValue?: string) => void;
  handleReset: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const EmailForm = ({
  values,
  errors,
  formIsValid,
  handleChange,
  handleBlur,
  handleColorChange,
  handleReset,
  handleSubmit,
}: EmailFormProps) => {
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} autoComplete="off">
        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <EmailInputs
            values={values}
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        </Grid>

        <PopoverColorPicker
          label="Theme Color"
          name="themeColor"
          value={values.themeColor}
          handleBlur={handleColorChange}
        />

        <Stack direction={{ xs: "column", sm: "row" }} gap={2} mb={5} mt={5}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={!formIsValid()}
            aria-label="create email signature"
            endIcon={<DesignServicesIcon />}>
            Create
          </Button>
          <Button
            fullWidth
            type="button"
            variant="outlined"
            size="large"
            aria-label="reset email signature"
            endIcon={<RestartAltIcon />}
            onClick={handleReset}>
            Reset
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default EmailForm;
