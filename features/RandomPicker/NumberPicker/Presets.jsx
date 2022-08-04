import { FormControlLabel, FormGroup, Switch } from '@mui/material'

import FieldsetContainer from '../FieldsetContainer'

const Presets = ({ values, handleChange }) => {
    return (
        <>
            <FieldsetContainer
                title='Presets'
                size='small'
                helperText={
                    values.isPowerball
                        ? 'Four numbers between 1-69 and one number between 1-26 for the powerball.'
                        : values.isMegaMillions
                        ? 'Four numbers between 1-70 and one number between 1-25 for the megaball.'
                        : 'Optional: select a preset.'
                }>
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
            </FieldsetContainer>
        </>
    )
}

export default Presets
