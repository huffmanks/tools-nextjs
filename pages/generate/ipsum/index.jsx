import { Grid, Typography } from "@mui/material";

import { useIpsumFormControls } from "../../../features/Ipsum/useIpsumFormControls";

import PageTitle from "../../../components/common/PageTitle";
import SEO from "../../../components/common/SEO";

import IpsumForm from "../../../features/Ipsum/IpsumForm";
import IpsumOutput from "../../../features/Ipsum/IpsumOutput";

const Ipsum = () => {
  const { values, checkAll, handleChange, handleCheckAll, handleCopy, handleReset, handleSubmit } = useIpsumFormControls();

  return (
    <>
      <SEO description="Mock content in multiple formats." title="Ipsum" url="/generate/ipsum" imageUrl="/ipsum.png" />

      <PageTitle>Ipsum</PageTitle>

      <Typography paragraph mb={5}>
        Mock content in multiple formats.
      </Typography>

      <Grid container spacing={5}>
        <IpsumForm values={values} checkAll={checkAll} handleChange={handleChange} handleCheckAll={handleCheckAll} handleReset={handleReset} handleSubmit={handleSubmit} />

        <IpsumOutput values={values} handleCopy={handleCopy} />
      </Grid>
    </>
  );
};

export default Ipsum;
