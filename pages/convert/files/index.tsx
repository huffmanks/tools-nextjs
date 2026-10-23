import { Grid, Typography } from "@mui/material";

import FileConverterForm from "@/features/FileConverter/FileConverterForm";
import { useFileConverterFormControls } from "@/features/FileConverter/useFileConverterFormControls";

import PageTitle from "@/components/common/PageTitle";
import SEO from "@/components/common/SEO";

const FileConverter = () => {
  const { values, errors, warnings, handleChange, handleDownload, handleFileUpload, handleReset } =
    useFileConverterFormControls();

  return (
    <>
      <SEO
        description="Convert files between common formats."
        title="File Converter"
        url="/convert/files"
        imageUrl="/file-converter.png"
      />

      <PageTitle>Data Converter</PageTitle>

      <Typography paragraph mb={5}>
        Convert files between common formats.
      </Typography>

      <Grid container spacing={3}>
        <FileConverterForm
          values={values}
          errors={errors}
          warnings={warnings}
          handleChange={handleChange}
          handleFileUpload={handleFileUpload}
          handleDownload={handleDownload}
          handleReset={handleReset}
        />
      </Grid>
    </>
  );
};

export default FileConverter;
