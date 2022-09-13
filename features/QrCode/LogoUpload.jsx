import { Button, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const LogoUpload = ({ logoBackgroundTransparent, logoName, handleChange }) => {
    return (
        <div style={{ marginBottom: 16 }}>
            <Typography variant='subtitle2' gutterBottom>
                Logo Upload
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'start', sm: 'center' }} gap={2} mb={2}>
                <Button component='label' variant='outlined' size='large' aria-label='upload logo' endIcon={<CloudUploadIcon />}>
                    Upload
                    <input type='file' hidden onChange={handleChange} />
                </Button>
                {logoName && <div>{logoName}</div>}
            </Stack>

            <FormControlLabel
                control={<Checkbox aria-label='Logo is transparent checkbox' name='logoBackgroundTransparent' checked={logoBackgroundTransparent} onChange={handleChange} />}
                label='Logo is transparent'
            />
        </div>
    )
}

export default LogoUpload
