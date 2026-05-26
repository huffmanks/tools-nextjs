import { Box, Typography } from "@mui/material";

import { useQrCodeFormControls } from "../../../features/QrCode/useQrCodeFormControls";

import PageTitle from "../../../components/common/PageTitle";
import SEO from "../../../components/common/SEO";
import QrCodeForm from "../../../features/QrCode/QrCodeForm";

const QrCode = () => {
  const { codeRef, values, colors, errors, downloadUrl, handleChange, handleColorChange, handleSubmit, handleReset } = useQrCodeFormControls();

  return (
    <>
      <SEO description="Create a QR code." title="QR Code Generator" url="/generate/qr-code" imageUrl="/qr-code.png" />

      <PageTitle>QR Code Generator</PageTitle>

      <Typography paragraph mb={5}>
        Create a QR code.
      </Typography>

      <QrCodeForm
        values={values}
        errors={errors}
        colors={colors}
        downloadUrl={downloadUrl}
        handleChange={handleChange}
        handleBlur={handleColorChange}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
      />

      <Box
        ref={codeRef}
        sx={{
          maxWidth: "100%",
          overflow: "hidden",
          "& canvas": {
            display: "block",
            width: values.outputSize === "200" ? 200 : 600,
            height: values.outputSize === "200" ? 200 : 600,
            maxWidth: "100%",
            objectFit: "contain",
            objectPosition: "top",
          },
        }}></Box>
    </>
  );
};

export default QrCode;
