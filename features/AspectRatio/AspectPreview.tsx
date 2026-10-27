import { Box, Grid, Stack } from "@mui/material";

import type { AspectRatioValues } from "@/features/AspectRatio/types";

interface AspectPreviewProps {
  values: AspectRatioValues;
}

const AspectPreview = ({ values }: AspectPreviewProps) => {
  const dimensions = values?.dimensions ?? "";

  return (
    <>
      <Grid size={{ xs: 12 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "125px",
            maxWidth: "100%",
            minHeight: "50px",
            maxHeight: "400px",
            margin: "0 auto",
            aspectRatio: values.aspectMultiplier !== "" ? values.aspectMultiplier : "1920 / 1080",
            backgroundColor: "background.altTwo",
            borderRadius: "4px",
          }}>
          <Stack spacing={1} sx={{ justifyContent: "center", alignItems: "center" }}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center", alignItems: "center" }}>
              {dimensions}
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center", alignItems: "center" }}>
              {values.aspectRatio !== "" ? values.aspectRatio : "16:9"}
            </Stack>
          </Stack>
        </Box>
      </Grid>
    </>
  );
};

export default AspectPreview;
