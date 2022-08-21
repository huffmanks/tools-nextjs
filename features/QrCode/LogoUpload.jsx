import { Button, Typography } from '@mui/material'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const LogoUpload = ({ handleChange }) => {
    return (
        <div style={{ marginBottom: 32 }}>
            <Typography variant='subtitle2' gutterBottom>
                Logo Upload
            </Typography>
            <Button component='label' variant='outlined' size='large' aria-label='upload logo' endIcon={<CloudUploadIcon />}>
                Upload
                <input type='file' hidden onChange={handleChange} />
            </Button>
        </div>
    )
}

export default LogoUpload
