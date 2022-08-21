import { Button, Link, Stack } from '@mui/material'

import QrCodeIcon from '@mui/icons-material/QrCode'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

const ActionGroup = ({ values, downloadUrl, handleReset }) => {
    return (
        <>
            <Stack direction={{ xs: 'column', xms: 'row' }} gap={2} mb={3}>
                <Button type='submit' variant='contained' size='large' aria-label='generate qr code' endIcon={<QrCodeIcon />}>
                    Generate
                </Button>
                <Button type='reset' variant='contained' size='large' aria-label='reset qr code form' endIcon={<RestartAltIcon />} onClick={handleReset}>
                    Reset
                </Button>
                {downloadUrl && (
                    <Link href={downloadUrl} download={`${values.qrCodeName}.png`} underline='none'>
                        <Button type='button' variant='contained' size='large' aria-label='download qr code' endIcon={<FileDownloadIcon />}>
                            Download
                        </Button>
                    </Link>
                )}
            </Stack>
        </>
    )
}

export default ActionGroup
