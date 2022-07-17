import { useFormControls } from '../../hooks/useFormControls'
import { initialValues } from '../../constants/emailSignature'

import { Box, Grid, Button } from '@mui/material'

import DesignServicesIcon from '@mui/icons-material/DesignServices'

import EmailInputs from './EmailInputs'
import ThemeColor from './ThemeColor'
import EmailOutput from './EmailOutput'

const EmailForm = () => {
    const { values, errors, formSubmitted, formIsValid, handleFocus, handleChange, handleBlur, handleSubmit } = useFormControls(initialValues)

    return (
        <>
            <Box component='form' onSubmit={handleSubmit} autoComplete='off'>
                <Grid container spacing={2} style={{ marginBottom: '40px' }}>
                    <EmailInputs values={values} errors={errors} handleChange={handleChange} handleBlur={handleBlur} />

                    <ThemeColor values={values} handleFocus={handleFocus} handleChange={handleChange} />
                </Grid>

                <Button
                    type='submit'
                    variant='contained'
                    size='large'
                    disabled={!formIsValid()}
                    aria-label='create email signature'
                    sx={{
                        backgroundColor: 'primary-main',
                        width: {
                            xs: '100%',
                            sm: 'auto',
                        },
                    }}
                    endIcon={<DesignServicesIcon />}>
                    Create
                </Button>

                {formSubmitted && <EmailOutput values={values} />}
            </Box>
        </>
    )
}

export default EmailForm
