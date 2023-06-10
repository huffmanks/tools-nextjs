import { Box, Grid, Stack, Typography } from '@mui/material'

import PopoverColorPicker from '../../components/common/PopoverColorPicker'
import ScrollbarRadios from './ScrollbarRadios'
import ScrollbarSelect from './ScrollbarSelect'
import { scrollbarTrackPickers, scrollbarThumbPickers } from '../../constants/popoverColorPicker'
import PixelInput from './PixelInput'

const ScrollbarForm = ({ values, handleBlur, handleChange, handleReset }) => {
    return (
        <>
            <Grid item xs={12} md={6}>
                <Typography variant='subtitle1' mb={2}>
                    Scrollbar Styles
                </Typography>
                <Stack direction='row' spacing={4}>
                    <ScrollbarRadios
                        radioGroup='directionRadios'
                        groupLabel='Direction'
                        ariaLabel='direction-radios-label'
                        groupName='axis'
                        defaultValue='y'
                        groupValue={values.axis}
                        handleChange={handleChange}
                    />
                    <ScrollbarRadios
                        radioGroup='trackTransparentRadios'
                        groupLabel='Track transparent?'
                        ariaLabel='track-transparent-radios-label'
                        groupName='isTrackTransparent'
                        defaultValue={true}
                        groupValue={values.isTrackTransparent}
                        handleChange={handleChange}
                    />
                </Stack>

                <Stack direction='row' gap={4} sx={{ margin: '16px 0 0' }}>
                    <ScrollbarSelect
                        selectGroup='firefoxWidthSelect'
                        groupLabel='Firefox width'
                        ariaLabel='firefoe-width-select-label'
                        groupName='widthFirefox'
                        defaultValue='auto'
                        groupValue={values.widthFirefox}
                        handleChange={handleChange}
                    />

                    <PixelInput inputLabel='Thickness' inputName='thickness' inputValue={values.thickness} handleChange={handleChange} />
                </Stack>

                <Stack direction='row' spacing={4} sx={{ margin: '0 0 24px' }}>
                    <Box sx={{ display: 'grid', alignItems: 'end', gap: 3 }}>
                        {scrollbarTrackPickers.map((picker) => (
                            <PopoverColorPicker key={picker.name} label={picker?.label} name={picker.name} helperText={picker?.helperText} handleBlur={handleBlur} />
                        ))}
                    </Box>

                    <Stack spacing={3} pt={10}>
                        <PixelInput inputLabel='Border radius' inputName='trackRadius' inputValue={values.trackRadius} handleChange={handleChange} />
                        <PixelInput inputLabel='Border width' inputName='trackBorderWidth' inputValue={values.trackBorderWidth} handleChange={handleChange} />

                        <ScrollbarSelect
                            selectGroup='trackBorderStyleSelect'
                            groupLabel='Border style'
                            ariaLabel='track-border-style-select-label'
                            groupName='trackBorderStyle'
                            defaultValue='auto'
                            groupValue={values.trackBorderStyle}
                            handleChange={handleChange}
                        />
                    </Stack>
                </Stack>

                <Stack direction='row' spacing={4} sx={{ margin: '40px 0 0' }}>
                    <Box sx={{ display: 'grid', alignItems: 'end', gap: 3 }}>
                        {scrollbarThumbPickers.map((picker) => (
                            <PopoverColorPicker key={picker.name} label={picker?.label} name={picker.name} helperText={picker?.helperText} handleBlur={handleBlur} />
                        ))}
                    </Box>

                    <Stack spacing={3} pt={10}>
                        <PixelInput inputLabel='Border radius' inputName='thumbRadius' inputValue={values.thumbRadius} handleChange={handleChange} />
                    </Stack>
                </Stack>
            </Grid>
        </>
    )
}

export default ScrollbarForm
