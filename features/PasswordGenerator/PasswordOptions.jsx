import { passwordOptions } from '../../constants/passwordGenerator'

import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material'

const PasswordOptions = ({ values, handleChange }) => {
    return (
        <FormControl component='fieldset'>
            <FormLabel component='legend' sx={{ marginBottom: 2 }}>
                Password Options
            </FormLabel>
            <FormGroup sx={{ marginBottom: 4 }}>
                {passwordOptions.map((option) => (
                    <FormControlLabel key={option.id} control={<Checkbox checked={values[option.name]} onChange={handleChange} name={option.name} />} label={option.label} labelPlacement='end' />
                ))}
            </FormGroup>
        </FormControl>
    )
}

export default PasswordOptions
