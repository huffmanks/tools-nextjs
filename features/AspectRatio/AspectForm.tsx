import { Chip, Grid } from "@mui/material";

import AspectInputs from "@/features/AspectRatio/AspectInputs";
import { type AspectRatioErrors, type AspectRatioValues } from "@/features/AspectRatio/constants";

interface AspectFormProps {
  values: AspectRatioValues;
  errors: AspectRatioErrors;
  handleFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => void;
  handleBlur: () => void;
}

const AspectForm = ({ values, errors, handleFocus, handleChange, handleBlur }: AspectFormProps) => {
  return (
    <Grid item container spacing={2} md={6} component="form">
      <Grid item xs={12}>
        <Chip label="Original" color="primary" component="div" sx={{ marginBottom: "2rem" }} />
      </Grid>

      <AspectInputs
        values={values}
        errors={errors}
        handleFocus={handleFocus}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    </Grid>
  );
};

export default AspectForm;
