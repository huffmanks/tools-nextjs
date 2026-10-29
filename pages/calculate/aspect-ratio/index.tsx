import { Grid, Typography } from "@mui/material";

import AspectForm from "@/features/AspectRatio/AspectForm";
import AspectOutput from "@/features/AspectRatio/AspectOutput";
import { useAspectRatioFormControls } from "@/features/AspectRatio/useAspectRatioFormControls";

import PageTitle from "@/components/common/PageTitle";
import SEO from "@/components/common/SEO";

export default function AspectRatio() {
  const { values, errors, handleFocus, handleChange, handleBlur } = useAspectRatioFormControls();

  return (
    <>
      <SEO
        description="Calculate the aspect ratio."
        title="Aspect Ratio Calculator"
        url="/calculate/aspect-ratio"
        imageUrl="/aspect-ratio.png"
      />

      <PageTitle>Aspect Ratio Calculator</PageTitle>

      <Typography component="p" sx={{ marginBlockEnd: 5 }}>
        Calculate the aspect ratio.
      </Typography>

      <Grid container spacing={5} sx={{ alignItems: "start", paddingBlockEnd: 8 }}>
        <AspectForm
          values={values}
          errors={errors}
          handleFocus={handleFocus}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

        <AspectOutput values={values} errors={errors} />
      </Grid>
    </>
  );
}
