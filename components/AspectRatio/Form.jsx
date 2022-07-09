import { Fragment } from 'react'

import { aspectInputs } from '../../constants/aspectRatio'

import { Grid, Chip, Divider, FormControl, FormControlLabel, TextField, RadioGroup, Radio } from '@mui/material'

const Form = ({ values, handleFocus, handleChange, handleCalculate }) => {
    return (
        <Grid item container spacing={2} md={6}>
            <Grid item xs={12}>
                <Chip label='Original' color='primary' component='div' sx={{ marginBottom: '2rem' }} />
            </Grid>

            {aspectInputs.map((input, index) => (
                <Fragment key={index}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoFocus={input.isAutoFocused}
                            fullWidth
                            variant='outlined'
                            label={input.isDynamic ? values.selectedType.charAt(0).toUpperCase() + values.selectedType.slice(1) : input.label}
                            placeholder={input.placeholder}
                            name={input.name}
                            value={values[input.name]}
                            onFocus={handleFocus}
                            onChange={handleChange}
                            onBlur={handleCalculate}
                            autoComplete='none'
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
