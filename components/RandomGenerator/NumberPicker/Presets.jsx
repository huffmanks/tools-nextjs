import { FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Switch } from '@mui/material'

const Presets = ({ values, handleChange }) => {
    return (
        <>
            <FormControl component='fieldset' variant='standard' sx={{ display: 'block' }}>
                <FormLabel component='legend' sx={{ marginBottom: 1 }}>
                    Presets
                </FormLabel>
                <FormGroup
                    sx={{
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: {
                            xs: 0,
                            sm: 2,
                        },
                        marginBottom: 1,
                    }}>
                    <FormControlLabel control={<Switch checked={values.isPowerball} onChange={handleChange} name='powerball' />} label='Powerball' />
                    <FormControlLabel control={<Switch checked={values.isMegaMillions} onChange={handleChange} name='megaMillions' />} label='Mega Millions' />
                </FormGroup>
                <FormHelperText>
                    {values.isPowerball
                        ? 'Four numbers between 1-69 and one number between 1-26 for the powerball.'
                        : values.isMegaMillions
                        ? 'Four numbers between 1-70 and one number between 1-25 for the megaball.'
                        : 'Optional: select a preset.'}
                </FormHelperText>
            </FormControl>
        </>
    )
}

export default Presets
