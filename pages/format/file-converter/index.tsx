import { Grid, Typography } from "@mui/material";

import FileConverterForm from "@/features/FileConverter/FileConverterForm";
import { useFileConverterFormControls } from "@/features/FileConverter/useFileConverterFormControls";

import PageTitle from "@/components/common/PageTitle";
import SEO from "@/components/common/SEO";

export default function FileConverter() {
  const { values, errors, warnings, handleChange, handleDownload, handleFileUpload, handleReset } =
    useFileConverterFormControls();

  return (
    <>
      <SEO
        description="Convert files between common formats."
        title="File Converter"
        url="/format/file-converter"
        imageUrl="/file-converter.png"
      />

      <PageTitle>File Converter</PageTitle>

      <Typography component="p" sx={{ marginBlockEnd: 5 }}>
        Convert files between common formats.
      </Typography>

      <Grid container spacing={3} sx={{ paddingBlockEnd: 8 }}>
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
}
