import { marks } from '../../constants/passwordGenerator'

import { Box, Grid, Slider, Typography } from '@mui/material'
import StraightenIcon from '@mui/icons-material/Straighten'

const SliderInput = ({ values, handleSlider }) => {
    return (
        <Box maxWidth='100%' width={500} marginBottom={5}>
            <Typography marginBottom={3}>Password Length</Typography>
            <Grid container spacing={3} alignItems='start' justifyContent='center'>
                <Grid item>
                    <StraightenIcon />
                </Grid>

                <Grid item xs>
                    <Slider value={values.slider} onChange={handleSlider} aria-labelledby='input-slider' marks={marks} min={8} max={24} step={2} valueLabelDisplay='on' />
                </Grid>
            </Grid>
        </Box>
    )
}

export default SliderInput
