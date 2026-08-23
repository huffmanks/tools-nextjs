import { Box, Button, Grid, Stack } from "@mui/material";

import DesignServicesIcon from "@mui/icons-material/DesignServices";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import PopoverColorPicker from "../../components/common/PopoverColorPicker";
import EmailInputs from "./EmailInputs";

const EmailForm = ({
  values,
  errors,
  formIsValid,
  handleChange,
  handleBlur,
  handleColorChange,
  handleReset,
  handleSubmit,
}) => {
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} autoComplete="off">
        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <EmailInputs values={values} errors={errors} handleChange={handleChange} handleBlur={handleBlur} />
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
