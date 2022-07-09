import { useFormControls } from '../../hooks/useFormControls'
import { initialValues, emailInputs, themeColorOptions } from '../../constants/emailSignature'

import { Box, Grid, TextField, FormLabel, InputAdornment, MenuItem, Button } from '@mui/material'

import Output from './Output'

import styles from '../../styles/EmailSignature.module.css'

const Form = () => {
    const { values, errors, formSubmitted, formIsValid, handleFocus, handleChange, handleBlur, handleSubmit } = useFormControls(initialValues)

    return (
        <>
            <Box component='form' onSubmit={handleSubmit} autoComplete='off'>
                <Grid container spacing={2} style={{ marginBottom: '40px' }}>
                    {emailInputs.map((field) => (
                        <Grid key={field.name} item sm={field.gridSm} xs={12}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                required={field.required ?? false}
                                label={field.label}
                                placeholder={field.placeholder}
                                name={field.name}
                                value={values[field.name]}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!errors[field.name]}
                                multiline={field.multiline ?? false}
                                rows={field.rows ?? 1}
                                autoComplete='none'
                                {...(errors[field.name] && {
                                    error: true,
                                    helperText: errors[field.name],
                                })}
                            />
                        </Grid>
                    ))}

                    <Grid item xs={12}>
                        <FormLabel>Theme Color</FormLabel>
                    </Grid>

                    <Grid item xl={0.75} md={1} sm={1.75} xs={3}>
                        <div className={styles['current-color']} style={{ backgroundColor: values.colorSymbol + values.themeColor + (values.hasEndSymbol ? ')' : '') }}></div>
                    </Grid>
                    <Grid item xl={1.75} sm={2.5} xs={9}>
                        <TextField fullWidth select label='Type' value={values?.colorType} name='colorType' onChange={handleChange}>
                            {themeColorOptions.map((option) => (
                                <MenuItem key={option.name} value={option.name}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xl={2.25} md={3} sm={4.75} xs={12}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label='Color'
                            placeholder={values.placeholder}
                            name='themeColor'
                            value={values.themeColor}
                            onFocus={handleFocus}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position='start'>{values.colorSymbol}</InputAdornment>,
                                endAdornment: (values.colorType === 'rgb' || values.colorType === 'hsl') && <InputAdornment position='end'>)</InputAdornment>,
                            }}
                        />
                    </Grid>
                </Grid>

                <Button
                    className={styles['form-btn']}
                    size='large'
                    variant='contained'
                    type='submit'
                    style={{ backgroundColor: `${!formIsValid() ? '#555' : 'var(--primary-main)'}` }}
                    disabled={!formIsValid()}>
                    Create
                </Button>

                {formSubmitted && <Output values={values} />}
            </Box>
        </>
    )
}

export default Form
