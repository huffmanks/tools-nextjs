import { passwordGeneratorMarks } from "../../constants/passwordGenerator";

import StraightenIcon from "@mui/icons-material/Straighten";
import { Box, Grid, Slider, Typography } from "@mui/material";

interface SliderInputProps {
  slider: number;
  handleSlider: (event: Event, value: number | number[], activeThumb: number) => void;
}

const SliderInput = ({ slider, handleSlider }: SliderInputProps) => {
  return (
    <Box maxWidth={500} width="100%" sx={{ marginBottom: { xs: 5, lg: 0 } }}>
      <Typography marginBottom={4}>Password Length</Typography>
      <Grid container alignItems="start" justifyContent="center" paddingInline={1}>
        <Grid item sx={{ paddingRight: "24px", display: { xs: "none", sm: "block" } }}>
          <StraightenIcon fontSize="large" />
        </Grid>

        <Grid item xs>
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
