import { useTextFormatterFormControls } from "../../../features/TextFormatter/useTextFormatterFormControls";

import { Grid, Typography } from "@mui/material";

import PageTitle from "../../../components/common/PageTitle";
import SEO from "../../../components/common/SEO";

import ActionGroup from "../../../features/TextFormatter/ActionGroup";
import Cards from "../../../features/TextFormatter/Cards";
import Textarea from "../../../features/TextFormatter/Textarea";

const TextFormatter = () => {
  const { values, checkedCards, checkAll, handleChange, handleSave, handleCheckAll, handleCopy, handleClear, handleReset, handleDeleteSaved } = useTextFormatterFormControls();

  return (
    <>
      <SEO description="Format text to any case." title="Text Formatter" url="/format/text" imageUrl="/text-formatter.png" />

      <PageTitle>Text Formatter</PageTitle>

      <Typography paragraph mb={5}>
        Format text to any case.
      </Typography>

      <Grid container spacing={5}>
        <Textarea output={values.output} handleChange={handleChange} handleClear={handleClear} />

        <ActionGroup
          values={values}
          checkAll={checkAll}
          handleChange={handleChange}
          handleCheckAll={handleCheckAll}
          handleReset={handleReset}
          handleSave={handleSave}
          handleDeleteSaved={handleDeleteSaved}
        />

        <Cards values={values} checkedCards={checkedCards} handleCopy={handleCopy} />
      </Grid>
    </>
  );
};

export default TextFormatter;
