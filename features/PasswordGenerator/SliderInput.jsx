import { marks } from '../../constants/passwordGenerator'

import { Box, Grid, Slider, Typography } from '@mui/material'
import StraightenIcon from '@mui/icons-material/Straighten'

const SliderInput = ({ slider, handleSlider }) => {
    return (
        <Box maxWidth={500} width='100%' marginBottom={5}>
            <Typography marginBottom={4}>Password Length</Typography>
            <Grid container alignItems='start' justifyContent='center' paddingInline={1}>
                <Grid item sx={{ paddingRight: '24px', display: { xs: 'none', sm: 'block' } }}>
                    <StraightenIcon fontSize='large' />
                </Grid>

                <Grid item xs>
                    <Slider value={slider} onChange={handleSlider} aria-labelledby='input-slider' marks={marks} min={8} max={24} step={2} valueLabelDisplay='auto' />
                </Grid>
            </Grid>
        </Box>
    )
}

export default SliderInput
