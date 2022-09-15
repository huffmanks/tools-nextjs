import { createRef, useState } from 'react'

import QRCode from 'easyqrcodejs'

import { initialValues } from '../../constants/qrCode'
import { getColorCode } from '../../utilities/getThemeColorOptions'

export const useQrCodeFormControls = (themeValues) => {
    const codeRef = createRef()

    const [values, setValues] = useState(initialValues)
    const [qrcode, setQrcode] = useState(null)
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

        if (qrcode) {
            qrcode.clear()
        }

        const { websiteLink, logoUpload, logoBackgroundTransparent } = values

        const options = {
            text: websiteLink,
            width: 512,
            height: 512,
            logo: logoUpload,
            logoBackgroundTransparent,
            colorDark: getColorCode(themeValues),
            colorLight: '#fff',
            PI: '#222',
            PO: '#222',
            // AI: '#009ACD',
            // AO: '#B03060',
            correctLevel: QRCode.CorrectLevel.H,
        }

        const QRCodeCanvas = new QRCode(codeRef.current, options)

        setQrcode(QRCodeCanvas)

        setTimeout(() => {
            const dataURL = QRCodeCanvas?._el.children[0].toDataURL('image/png')
            const url = dataURL.replace(/^data:image\/png/, 'data:application/octet-stream')

            setDownloadUrl(url)
        }, 100)
    }

    const handleReset = () => {
        setValues(initialValues)
        setDownloadUrl('')

        if (qrcode) {
            qrcode.clear()
        }
    }

    return {
        codeRef,
        values,
        downloadUrl,
        handleChange,
        // handleBlur,
        handleSubmit,
        handleReset,
    }
}
