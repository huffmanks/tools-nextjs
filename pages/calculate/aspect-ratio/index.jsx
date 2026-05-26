import { initialValues } from "../../../constants/aspectRatio";
import { useAspectRatioFormControls } from "../../../features/AspectRatio/useAspectRatioFormControls";

import { Grid, Typography } from "@mui/material";

import PageTitle from "../../../components/common/PageTitle";
import SEO from "../../../components/common/SEO";

import AspectForm from "../../../features/AspectRatio/AspectForm";
import AspectOutput from "../../../features/AspectRatio/AspectOutput";

const AspectRatio = () => {
  const { values, errors, handleFocus, handleChange, handleBlur } = useAspectRatioFormControls(initialValues);

  return (
    <>
      <SEO description="Calculate the aspect ratio." title="Aspect Ratio Calculator" url="/calculate/aspect-ratio" imageUrl="/aspect-ratio.png" />

      <PageTitle>Aspect Ratio Calculator</PageTitle>

      <Typography paragraph mb={5}>
        Calculate the aspect ratio.
      </Typography>

      <Grid container spacing={5} alignItems="start">
        <AspectForm values={values} errors={errors} handleFocus={handleFocus} handleChange={handleChange} handleBlur={handleBlur} />

        <AspectOutput values={values} errors={errors} />
      </Grid>
    </>
  );
};

export default AspectRatio;
