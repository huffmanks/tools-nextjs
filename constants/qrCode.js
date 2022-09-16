export const initialValues = {
    qrCodeName: 'qr-code',
    websiteLink: 'https://tools.huffmanks.com/generate/qr-code',
    logoBackgroundTransparent: false,
    logoUpload: '',
    logoName: '',
}

export const qrCodeInputs = [
    {
        label: 'QR Code Name',
        name: 'qrCodeName',
        placeholder: 'qr-code',
    },
    {
        label: 'Website Link',
        name: 'websiteLink',
        type: 'url',
        placeholder: 'https://tools.huffmanks.com/generate/qr-code',
    },
]
