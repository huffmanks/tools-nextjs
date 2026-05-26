import { Chip, Grid } from "@mui/material";

import AspectPreview from "./AspectPreview";
import AspectValues from "./AspectValues";

const AspectOutput = ({ values, errors }) => {
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
