import { Box, Grid, Button } from '@mui/material'

import DesignServicesIcon from '@mui/icons-material/DesignServices'

import EmailInputs from './EmailInputs'
import ThemeColor from './ThemeColor'

const EmailForm = ({ values, errors, formIsValid, handleFocus, handleChange, handleBlur, handleSubmit }) => {
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
                        width: {
                            xs: '100%',
                            sm: 'auto',
                        },
                        marginBottom: 6,
                        backgroundColor: 'primary-main',
                    }}
                    endIcon={<DesignServicesIcon />}>
                    Create
                </Button>
            </Box>
        </>
    )
}

export default EmailForm
