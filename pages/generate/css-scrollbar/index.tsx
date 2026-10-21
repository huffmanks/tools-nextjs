import { Grid, Typography } from "@mui/material";

import { useCSSScrollbarFormControls } from "../../../features/CSSScrollbar/useCSSScrollbarFormControls";
import { usePopoverColorPicker } from "../../../hooks/usePopoverColorPicker";

import PageTitle from "../../../components/common/PageTitle";
import SEO from "../../../components/common/SEO";

import { initialPopoverColorPickerValues } from "../../../constants/popoverColorPicker";
import ScrollbarForm from "../../../features/CSSScrollbar/ScrollbarForm";
import ScrollbarOutput from "../../../features/CSSScrollbar/ScrollbarOutput";

const CSSScrollbar = () => {
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

      <Typography paragraph mb={5}>
        Customize a CSS scrollbar.
      </Typography>

      <Grid container spacing={5}>
        <ScrollbarForm values={values} colors={colors} handleBlur={handleBlur} handleChange={handleChange} />

        <ScrollbarOutput values={values} colors={colors} />
      </Grid>
    </>
  );
};

export default CSSScrollbar;
