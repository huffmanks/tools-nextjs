import { Grid, Typography } from "@mui/material";

import MockContentForm from "@/features/MockContent/MockContentForm";
import MockContentOutput from "@/features/MockContent/MockContentOutput";
import { useMockContentFormControls } from "@/features/MockContent/useMockContentFormControls";

import PageTitle from "@/components/common/PageTitle";
import SEO from "@/components/common/SEO";

const MockContent = () => {
  const { values, checkAll, handleChange, handleCheckAll, handleCopy, handleReset, handleSubmit } =
    useMockContentFormControls();

  return (
    <>
      <SEO
        description="Placeholder text in many formats."
        title="Mock Content"
        url="/generate/mock-content"
        imageUrl="/mock-content.png"
      />

      <PageTitle>Mock Content</PageTitle>

      <Typography component="p" sx={{ marginBlockEnd: 5 }}>
        Placeholder text in many formats.
      </Typography>

      <Grid container spacing={5}>
        <MockContentForm
          values={values}
          checkAll={checkAll}
          handleChange={handleChange}
          handleCheckAll={handleCheckAll}
          handleReset={handleReset}
          handleSubmit={handleSubmit}
        />

        <MockContentOutput values={values} handleCopy={handleCopy} />
      </Grid>
    </>
  );
};

export default MockContent;
