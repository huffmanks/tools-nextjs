import { Chip, Grid } from "@mui/material";

import AspectPreview from "@/features/AspectRatio/AspectPreview";
import AspectValues from "@/features/AspectRatio/AspectValues";
import { type AspectRatioErrors, type AspectRatioValues } from "@/features/AspectRatio/constants";

interface AspectOutputProps {
  values: AspectRatioValues;
  errors: AspectRatioErrors;
}

const AspectOutput = ({ values, errors }: AspectOutputProps) => {
  return (
    <Grid item container spacing={2} md={6}>
      <Grid item xs={12}>
        <Chip label="Output" color="primary" component="div" sx={{ marginBottom: "2rem" }} />
      </Grid>

      <AspectValues values={values} errors={errors} />

      <AspectPreview values={values} />
    </Grid>
  );
};

export default AspectOutput;
