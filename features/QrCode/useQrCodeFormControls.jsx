import { createRef, useState } from 'react'

import QRCode from 'easyqrcodejs'

import { initialValues } from '../../constants/qrCode'

export const useQrCodeFormControls = () => {
    const codeRef = createRef()

    const [values, setValues] = useState(initialValues)
    const [downloadUrl, setDownloadUrl] = useState('')

    const handleChange = (e) => {
        const { name, type, value, files } = e.target

        if (type === 'file') {
            const file = files[0]

            const reader = new FileReader()

            reader.onloadend = handleFile

            if (file) {
                reader.readAsDataURL(file)
            }
        } else {
            setValues({
                ...values,
                [name]: value,
            })
        }
    }
    const handleFile = (e) => {
        const logoUpload = e.target.result
        setValues({
            ...values,
            logoUpload,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const { websiteLink, logoUpload } = values

        const options = {
            text: websiteLink,
            width: 512,
            height: 512,
            logo: logoUpload,
            logoBackgroundTransparent: true,
            colorDark: '#5b21b6',
            colorLight: '#fff',
            PI: '#222',
            PO: '#222',
            // AI: '#009ACD',
            // AO: '#B03060',
            correctLevel: QRCode.CorrectLevel.H,
        }

        new QRCode(codeRef.current, options)

        setTimeout(() => {
            const canvas = codeRef.current.querySelector('canvas')
            const dataURL = canvas?.toDataURL('image/png')
            const url = dataURL.replace(/^data:image\/png/, 'data:application/octet-stream')

            setDownloadUrl(url)
        }, 100)
    }

    const handleReset = () => {
        setValues(initialValues)
        setDownloadUrl('')
    }

    return {
        codeRef,
        values,
        downloadUrl,
        // handleFocus,
        handleChange,
        // handleBlur,
        handleSubmit,
        handleReset,
    }
}
