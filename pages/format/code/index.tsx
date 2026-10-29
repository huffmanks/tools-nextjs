import { Grid, Typography } from "@mui/material";

import CodeFormatForm from "@/features/CodeFormatter/CodeFormatForm";
import { useCodeFormatterFormControls } from "@/features/CodeFormatter/useCodeFormatterFormControls";

import PageTitle from "@/components/common/PageTitle";
import SEO from "@/components/common/SEO";

export default function CodeFormatter() {
  const { values, errors, handleChange, handleReset } = useCodeFormatterFormControls();

  return (
    <>
      <SEO
        description="Minify, escape and encode data."
        title="Code Formatter"
        url="/format/code"
        imageUrl="/code-formatter.png"
      />

      <PageTitle>Code Formatter</PageTitle>

      <Typography component="p" sx={{ marginBlockEnd: 5 }}>
        Minify, escape and encode data.
      </Typography>

      <Grid container spacing={3} sx={{ paddingBlockEnd: 8 }}>
        <CodeFormatForm
          values={values}
          errors={errors}
          handleChange={handleChange}
          handleReset={handleReset}
        />
      </Grid>
    </>
  );
}
