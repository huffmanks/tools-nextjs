import { Grid, Typography } from "@mui/material";

import ColorForm from "@/features/ColorPicker/ColorForm";
import ColorVariants from "@/features/ColorPicker/ColorVariants";
import Colord from "@/features/ColorPicker/Colord";
import { useColorPickerFormControls } from "@/features/ColorPicker/useColorPickerFormControls";

import PageTitle from "@/components/common/PageTitle";
import SEO from "@/components/common/SEO";

const ColorPicker = () => {
  const { color, convertedColors, tintType, setColor, handleColor, handleTintType } =
    useColorPickerFormControls();

  return (
    <>
      <SEO
        description="Choose a color in HEX, RGB or HSL."
        title="Color Picker"
        url="/picker/color"
        imageUrl="/color-picker.png"
      />
      <PageTitle>Color Picker</PageTitle>

      <Typography component="p" sx={{ marginBlockEnd: 5 }}>
        Choose a color in HEX, RGB or HSL.
      </Typography>

      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Colord color={color} onChange={setColor} />

          <ColorForm convertedColors={convertedColors} handleColor={handleColor} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              width: "max-content",
              marginBottom: 4,
              padding: "0.5rem 1rem",
              background: convertedColors.badgeColor,
              color: convertedColors.textColor,
              borderRadius: "10px",
              fontSize: {
                xs: "1.5rem",
                md: "2.125rem",
              },
            }}>
            Tints
          </Typography>

          <ColorVariants
            convertedColors={convertedColors}
            tintType={tintType}
            handleTintType={handleTintType}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ColorPicker;
