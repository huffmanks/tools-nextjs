import { Box, Container, TextField } from '@mui/material'

import { qrCodeInputs } from '../../constants/qrCode'
import { qrCodePickers } from '../../constants/popoverColorPicker'

import ActionGroup from './ActionGroup'
import LogoUpload from './LogoUpload'
import PopoverColorPicker from '../../components/common/PopoverColorPicker'

const QrCodeForm = ({ values, downloadUrl, handleFocus, handleChange, handleBlur, handleSubmit, handleReset }) => {
    return (
        <Container maxWidth='sm' disableGutters sx={{ margin: 0 }}>
            <Box component='form' onSubmit={handleSubmit} autoComplete='off' sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {qrCodeInputs.map((input) => (
                    <TextField
                        key={input.name}
                        type={input.type || 'text'}
                        fullWidth
                        variant='outlined'
                        label={input.label}
                        placeholder={input.placeholder}
                        name={input.name}
                        value={values[input.name]}
                        onFocus={handleFocus}
                        onChange={handleChange}
                        autoComplete='none'
                    />
                ))}

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, alignItems: 'end', gap: 3 }}>
                    {qrCodePickers.map((picker) => (
                        <PopoverColorPicker key={picker.name} label={picker?.label} name={picker.name} helperText={picker?.helperText} handleBlur={handleBlur} />
                    ))}
                </Box>

                <LogoUpload logoBackgroundTransparent={values.logoBackgroundTransparent} logoName={values.logoName} handleChange={handleChange} />

                <ActionGroup values={values} downloadUrl={downloadUrl} handleReset={handleReset} />
            </Box>
        </Container>
    )
}

export default QrCodeForm
