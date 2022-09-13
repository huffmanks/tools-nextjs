export const initialValues = {
    qrCodeName: 'qr-code',
    websiteLink: 'https://tools.huffmanks.com/generate/qr-code',
    logoBackgroundTransparent: false,
    logoUpload: '',
    logoName: '',
    colorDark: '#5b21b6',
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
        placeholder: 'https://tools.huffmanks.com/generate/qr-code',
    },
    {
        label: 'Theme Color',
        name: 'colorDark',
        placeholder: '#5b21b6',
    },
]
