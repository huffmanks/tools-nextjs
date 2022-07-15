import { useEffect, useState } from 'react'
import { initialValues, passwordOptions, symbols, numbers, lowerCase, upperCase, similarCharacters } from '../../constants/passwordGenerator'

import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, InputAdornment, TextField } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

import SEO from '../../components/layout/SEO'
import PageTitle from '../../components/layout/PageTitle'
import SliderInput from '../../components/PasswordGenerator/SliderInput'

const PasswordGenerator = () => {
    const [values, setValues] = useState(initialValues)
    const [passwordPool, setPasswordPool] = useState([])

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

    useEffect(() => {
        const temp = Object.keys(values).filter((key) => values[key] === true)

        const arr = [...symbols, ...numbers, ...lowerCase, ...upperCase, ...similarCharacters]
        // console.log(arr)
    }, [values])

    return (
        <>
            <SEO description='Create a strong password.' title='Password Generator' url='/password-generator' />
            <PageTitle>Password Generator</PageTitle>

            <SliderInput values={values} handleSlider={handleSlider} />

            <FormControl component='fieldset'>
                <FormLabel component='legend' sx={{ marginBottom: 2 }}>
                    Password Options
                </FormLabel>
                <FormGroup>
                    {passwordOptions.map((option) => (
                        <FormControlLabel key={option.id} control={<Checkbox checked={values[option.name]} onChange={handleChange} name={option.name} />} label={option.label} labelPlacement='end' />
                    ))}
                </FormGroup>
            </FormControl>

            <FormGroup>
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
            </FormGroup>
        </>
    )
}

export default PasswordGenerator
