import StraightenIcon from "@mui/icons-material/Straighten";
import { Box, Grid, Slider, Typography } from "@mui/material";

import { passwordGeneratorMarks } from "@/features/PasswordGenerator/constants";

interface SliderInputProps {
  slider: number;
  handleSlider: (event: Event, value: number | number[], activeThumb: number) => void;
}

const SliderInput = ({ slider, handleSlider }: SliderInputProps) => {
  return (
    <Box sx={{ maxWidth: 500, width: "100%", marginBlockEnd: { xs: 5, lg: 0 } }}>
      <Typography sx={{ marginBlockEnd: 4 }}>Password Length</Typography>
      <Grid container sx={{ alignItems: "start", justifyContent: "center", paddingInline: 1 }}>
        <Grid sx={{ paddingRight: "24px", display: { xs: "none", sm: "block" } }}>
          <StraightenIcon fontSize="large" />
        </Grid>

        <Grid size="grow">
          <Slider
            value={slider}
            onChange={handleSlider}
            aria-labelledby="input-slider"
            marks={passwordGeneratorMarks}
            min={8}
            max={24}
            step={2}
            valueLabelDisplay="auto"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SliderInput;
