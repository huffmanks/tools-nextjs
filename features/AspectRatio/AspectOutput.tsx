import { Chip, Grid } from "@mui/material";

import { AspectRatioErrors, AspectRatioValues } from "../../constants/aspectRatio";
import AspectPreview from "./AspectPreview";
import AspectValues from "./AspectValues";

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
