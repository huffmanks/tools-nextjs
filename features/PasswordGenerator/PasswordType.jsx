import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

const PasswordType = ({ values, handleChange }) => {
    return (
        <>
            <FormControl component='fieldset' sx={{ marginBottom: 4 }}>
                <FormLabel id='password-type'>Type</FormLabel>
                <RadioGroup row defaultValue='password' aria-labelledby='password-type' name='passwordType' value={values.passwordType} onChange={handleChange}>
                    <FormControlLabel
                        value='password'
                        control={
                            <Radio
                                sx={{
                                    '&.Mui-checked': {
                                        color: 'primary.main',
                                    },
                                }}
                            />
                        }
                        label='Password'
                    />
                    <FormControlLabel
                        value='keygen'
                        control={
                            <Radio
                                sx={{
                                    '&.Mui-checked': {
                                        color: 'primary.main',
                                    },
                                }}
                            />
                        }
                        label='Keygen'
                    />
                </RadioGroup>
            </FormControl>
        </>
    )
}

export default PasswordType
