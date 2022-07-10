import { useState } from 'react'
import { initialValues, passwordOptions } from '../../constants/passwordGenerator'

import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, InputAdornment, TextField } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

import SEO from '../../components/layout/SEO'
import PageTitle from '../../components/layout/PageTitle'
import SliderInput from '../../components/PasswordGenerator/SliderInput'

const PasswordGenerator = () => {
    const [values, setValues] = useState(initialValues)

    const handleSlider = (e, newValue) => {
        setValues({
            ...values,
            slider: Number(newValue),
        })
    }

    const handleChange = (e) => {
        const { value, name, type, checked } = e.target

        if (type === 'checkbox') {
            setValues({
                ...values,
                [name]: checked,
            })
        } else {
            setValues({
                ...values,
                [name]: value,
            })
        }
    }

    return (
        <>
            <SEO description='Create a strong password.' title='Password Generator' url='/password-generator' />
            <PageTitle>Password Generator</PageTitle>

            <SliderInput values={values} handleSlider={handleSlider} />

            <FormControl component='fieldset'>
                <FormLabel component='legend'>Password Options</FormLabel>
                <FormGroup>
                    {passwordOptions.map((option) => (
                        <FormControlLabel key={option.id} control={<Checkbox checked={values[option.name]} onChange={handleChange} name={option.name} />} label={option.label} labelPlacement='start' />
                    ))}
                </FormGroup>
            </FormControl>

            <TextField
                focused
                readOnly
                variant='outlined'
                label='Password'
                name='password'
                value={values.password}
                autoComplete='none'
                sx={{ maxWidth: '100%', width: 500, marginTop: 5 }}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton aria-label='copy value to clipboard' onClick={() => navigator.clipboard.writeText(values.password)} edge='end'>
                                <ContentCopyIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </>
    )
}

export default PasswordGenerator
