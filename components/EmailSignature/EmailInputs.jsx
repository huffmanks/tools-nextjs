import { Grid, TextField } from '@mui/material'
import { emailInputs } from '../../constants/emailSignature'

const EmailInputs = ({ values, errors, handleChange, handleBlur }) => {
    return (
        <>
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
                        onChange={handleChange}
                        onBlur={handleBlur}
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
        </>
    )
}

export default EmailInputs
