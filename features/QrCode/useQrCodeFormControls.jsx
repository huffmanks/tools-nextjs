import { createRef, useState } from 'react'

import QRCode from 'easyqrcodejs'

import { initialValues } from '../../constants/qrCode'

export const useQrCodeFormControls = () => {
    const codeRef = createRef()

    const [values, setValues] = useState(initialValues)
    const [downloadUrl, setDownloadUrl] = useState('')

    const handleChange = (e) => {
        const { checked, name, type, value, files } = e.target

        if (type === 'file') {
            const file = files[0]

            const reader = new FileReader()

            reader.onloadend = handleFile(file.name)

            if (file) {
                reader.readAsDataURL(file)
            }
        } else if (type === 'checkbox') {
            setValues({
                ...values,
                [name]: checked,
            })
        } else {
            setValues({
                ...values,
                [name]: value,
            })
        }
    }
    const handleFile = (logoName) => (e) => {
        const logoUpload = e.target.result
        setValues({
            ...values,
            logoUpload,
            logoName,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const { websiteLink, logoUpload, logoBackgroundTransparent, colorDark } = values

        const options = {
            text: websiteLink,
            width: 512,
            height: 512,
            logo: logoUpload,
            logoBackgroundTransparent,
            colorDark,
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
        codeRef.current.innerHTML = ''
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
