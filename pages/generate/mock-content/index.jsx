import { Grid, Typography } from "@mui/material";

import { useMockContentFormControls } from "../../../features/MockContent/useMockContentFormControls";

import PageTitle from "../../../components/common/PageTitle";
import SEO from "../../../components/common/SEO";

import MockContentForm from "../../../features/MockContent/MockContentForm";
import MockContentOutput from "../../../features/MockContent/MockContentOutput";

const MockContent = () => {
  const { values, checkAll, handleChange, handleCheckAll, handleCopy, handleReset, handleSubmit } = useMockContentFormControls();

  return (
    <>
      <SEO description="Placeholder text in many formats." title="Mock Content" url="/generate/mock-content" imageUrl="/mock-content.png" />

      <PageTitle>Mock Content</PageTitle>

      <Typography paragraph mb={5}>
        Placeholder text in many formats.
      </Typography>

      <Grid container spacing={5}>
        <MockContentForm values={values} checkAll={checkAll} handleChange={handleChange} handleCheckAll={handleCheckAll} handleReset={handleReset} handleSubmit={handleSubmit} />

        <MockContentOutput values={values} handleCopy={handleCopy} />
      </Grid>
    </>
  );
};

export default MockContent;
