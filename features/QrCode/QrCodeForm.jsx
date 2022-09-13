import { qrCodeInputs } from '../../constants/qrCode'

import { Box, Container, TextField } from '@mui/material'

// import ThemeColor from '../EmailSignature/ThemeColor'

import ActionGroup from './ActionGroup'
import LogoUpload from './LogoUpload'

const QrCodeForm = ({ values, downloadUrl, handleChange, handleSubmit, handleReset }) => {
    return (
        <Container maxWidth='sm' disableGutters sx={{ margin: 0 }}>
            <Box component='form' onSubmit={handleSubmit} autoComplete='off' sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {qrCodeInputs.map((input, i) => (
                    <TextField
                        key={i}
                        fullWidth
                        variant='outlined'
                        label={input.label}
                        placeholder={input.placeholder}
                        name={input.name}
                        value={values[input.name]}
                        // onFocus={handleFocus}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        // error={!!errors[input.name]}
                        autoComplete='none'
                        // {...(errors[input.name] && {
                        //     error: true,
                        //     helperText: errors[input.name],
                        // })}
                    />
                ))}

                <LogoUpload logoBackgroundTransparent={values.logoBackgroundTransparent} logoName={values.logoName} handleChange={handleChange} />

                {/* <ThemeColor values={values} handleChange={handleChange} /> */}

                <ActionGroup values={values} downloadUrl={downloadUrl} handleReset={handleReset} />
            </Box>
        </Container>
    )
}

export default QrCodeForm
