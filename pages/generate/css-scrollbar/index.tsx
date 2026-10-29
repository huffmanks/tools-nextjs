import { Grid, Typography } from "@mui/material";

import { initialPopoverColorPickerValues } from "@/constants/popoverColorPicker";
import { usePopoverColorPicker } from "@/hooks/usePopoverColorPicker";

import ScrollbarForm from "@/features/CSSScrollbar/ScrollbarForm";
import ScrollbarOutput from "@/features/CSSScrollbar/ScrollbarOutput";
import { useCSSScrollbarFormControls } from "@/features/CSSScrollbar/useCSSScrollbarFormControls";

import PageTitle from "@/components/common/PageTitle";
import SEO from "@/components/common/SEO";

export default function CSSScrollbar() {
  const { colors, handleBlur } = usePopoverColorPicker(initialPopoverColorPickerValues);
  const { values, handleChange } = useCSSScrollbarFormControls();

  return (
    <>
      <SEO
        description="Customize a CSS scrollbar."
        title="CSS Scrollbar"
        url="/generate/css-scrollbar"
        imageUrl="/css-scrollbar.png"
      />

      <PageTitle>CSS Scrollbar</PageTitle>

      <Typography component="p" sx={{ marginBlockEnd: 5 }}>
        Customize a CSS scrollbar.
      </Typography>

      <Grid container spacing={5} sx={{ paddingBlockEnd: 4 }}>
        <ScrollbarForm
          values={values}
          colors={colors}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />

        <ScrollbarOutput values={values} colors={colors} />
      </Grid>
    </>
  );
}
