import { useQrCodeFormControls } from '../../../features/QrCode/useQrCodeFormControls'

import { Box, Typography } from '@mui/material'

import PageTitle from '../../../components/common/PageTitle'
import SEO from '../../../components/common/SEO'
import QrCodeForm from '../../../features/QrCode/QrCodeForm'

const QrCode = () => {
    const { codeRef, values, downloadUrl, handleChange, handleSubmit, handleReset } = useQrCodeFormControls()

    return (
        <>
            <SEO
                description='Create a QR code.'
                title='QR Code Generator'
                url='/generate/qr-code'
                //  imageUrl='/qr-code.png'
            />

            <PageTitle>QR Code Generator</PageTitle>

            <Typography paragraph mb={5}>
                Create a QR code.
            </Typography>

            <QrCodeForm values={values} downloadUrl={downloadUrl} handleChange={handleChange} handleSubmit={handleSubmit} handleReset={handleReset} />

            <Box ref={codeRef} sx={{ '& canvas': { maxWidth: '100%' } }}></Box>
        </>
    )
}

export default QrCode
