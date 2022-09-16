import { Box, Grid, Button } from '@mui/material'

import DesignServicesIcon from '@mui/icons-material/DesignServices'

import EmailInputs from './EmailInputs'
import PopoverColorPicker from '../../components/common/PopoverColorPicker'

const EmailForm = ({ values, errors, formIsValid, handleChange, handleBlur, handleColorPickerBlur, handleSubmit }) => {
    return (
        <>
            <Box component='form' onSubmit={handleSubmit} autoComplete='off'>
                <Grid container spacing={2} sx={{ marginBottom: 3 }}>
                    <EmailInputs values={values} errors={errors} handleChange={handleChange} handleBlur={handleBlur} />
                </Grid>

                <PopoverColorPicker label='Theme Color' name='themeColor' handleBlur={handleColorPickerBlur} />

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
                        marginTop: 4,
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
