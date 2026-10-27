import { Chip, Grid } from "@mui/material";

import AspectPreview from "@/features/AspectRatio/AspectPreview";
import AspectValues from "@/features/AspectRatio/AspectValues";
import type { AspectRatioErrors, AspectRatioValues } from "@/features/AspectRatio/types";

interface AspectOutputProps {
  values: AspectRatioValues;
  errors: AspectRatioErrors;
}

const AspectOutput = ({ values, errors }: AspectOutputProps) => {
  return (
    <Grid container spacing={2} size={{ md: 6 }}>
      <Grid size={{ xs: 12 }}>
        <Chip label="Output" color="primary" component="div" sx={{ marginBottom: "2rem" }} />
      </Grid>

      <AspectValues values={values} errors={errors} />

      <AspectPreview values={values} />
    </Grid>
  );
};

export default AspectOutput;
