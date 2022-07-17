import { Fragment } from 'react'

import { aspectInputs } from '../../constants/aspectRatio'

import { Grid, Chip, Divider, FormControl, FormControlLabel, TextField, RadioGroup, Radio } from '@mui/material'

const AspectInputs = ({ values, errors, handleFocus, handleChange, handleBlur }) => {
    return (
        <>
            {aspectInputs.map((input, index) => (
                <Fragment key={index}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label={input.isDynamic ? values.selectedType.charAt(0).toUpperCase() + values.selectedType.slice(1) : input.label}
                            placeholder={input.placeholder}
                            name={input.name}
                            value={values[input.name]}
                            onFocus={handleFocus}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
        </>
    )
}

export default AspectInputs
