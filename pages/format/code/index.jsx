import { Grid, Typography } from "@mui/material";

import PageTitle from "../../../components/common/PageTitle";
import SEO from "../../../components/common/SEO";

import CodeFormatForm from "../../../features/CodeFormatter/CodeFormatForm";
import { useCodeFormatterFormControls } from "../../../features/CodeFormatter/useCodeFormatterFormControls";

const CodeFormatter = () => {
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

      <Typography paragraph mb={5}>
        Minify, escape and encode data.
      </Typography>

      <Grid container spacing={3}>
        <CodeFormatForm values={values} errors={errors} handleChange={handleChange} handleReset={handleReset} />
      </Grid>
    </>
  );
};

export default CodeFormatter;
