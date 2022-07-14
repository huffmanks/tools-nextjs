import { Fragment } from 'react'

import { useDebounce } from '../../hooks/useDebounce'
import { useWindowSize } from '../../hooks/useWindowSize'
import { aspectInputs } from '../../constants/aspectRatio'

import { Grid, Chip, Divider, FormControl, FormControlLabel, TextField, RadioGroup, Radio } from '@mui/material'

const Form = ({ values, errors, handleFocus, handleChange, handleCalculate }) => {
    const { isMobile } = useWindowSize()
    const debouncedValue = useDebounce(values.newSize, 500)

    return (
        <Grid item container spacing={2} md={6} component='form'>
            <Grid item xs={12}>
                <Chip label='Original' color='primary' component='div' sx={{ marginBottom: '2rem' }} />
            </Grid>

            {aspectInputs.map((input, index) => (
                <Fragment key={index}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoFocus={index === 0 && !isMobile ? true : false}
                            fullWidth
                            variant='outlined'
                            label={input.isDynamic ? values.selectedType.charAt(0).toUpperCase() + values.selectedType.slice(1) : input.label}
                            placeholder={input.placeholder}
                            name={input.name}
                            value={values[input.name]}
                            onFocus={handleFocus}
                            onChange={handleChange}
                            onBlur={handleCalculate}
                            error={!!errors[input.name]}
                            autoComplete='none'
                            {...(errors[input.name] && {
                                error: true,
                                helperText: errors[input.name],
                            })}
                        />
                    </Grid>

                    {index === 1 && (
                        <>
                            <Grid item xs={12}>
                                <Divider sx={{ margin: '2rem 0' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Chip label='New' color='primary' component='div' sx={{ marginBottom: '2rem' }} />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl component='fieldset'>
                                    <RadioGroup defaultValue='width' name='selectedType' value={values.selectedType} onChange={handleChange}>
                                        <FormControlLabel value='width' control={<Radio color='primary' />} label='Width' />
                                        <FormControlLabel value='height' control={<Radio color='primary' />} label='Height' />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </>
                    )}
                </Fragment>
            ))}
        </Grid>
    )
}

export default Form
