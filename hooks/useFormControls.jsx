import { useCallback, useState } from 'react'

import { getAspectNumbers } from '../utilities/getAspectNumbers'
import { getColorOptionsInfo } from '../constants/emailSignature'

export const useFormControls = (initialValues) => {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [formSubmitted, setFormSubmitted] = useState(false)

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('fullName' in fieldValues) temp.fullName = fieldValues.fullName ? '' : 'This field is required.'

        if ('email' in fieldValues) {
            temp.email = fieldValues.email ? '' : 'This field is required.'
            if (fieldValues.email) temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email) ? '' : 'Email is not valid.'
        }

        if ('title' in fieldValues) temp.title = fieldValues.title ? '' : 'This field is required.'

        if ('phone' in fieldValues) {
            temp.phone = fieldValues.phone ? '' : 'This field is required.'
            if (fieldValues.phone) temp.phone = fieldValues.phone.match(/\d{3}-\d{3}-\d{4}/g) ? '' : 'Phone number is not valid.'
        }

        if ('cellPhone' in fieldValues) {
            temp.cellPhone = fieldValues.cellPhone.match(/\d{3}-\d{3}-\d{4}/g) || fieldValues.cellPhone === '' ? '' : 'Cell number is not valid.'
        }

        if ('fax' in fieldValues) {
            temp.fax = fieldValues.fax.match(/\d{3}-\d{3}-\d{4}/g) || fieldValues.fax === '' ? '' : 'Fax number is not valid.'
        }

        if ('website' in fieldValues) {
            temp.website =
                fieldValues.website.match(/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi) || fieldValues.website === '' ? '' : 'Website URL is not valid.'
        }

        if ('originalWidth' in fieldValues) {
            temp.originalWidth = fieldValues.originalWidth.match(/^[0-9]*$/g) || fieldValues.originalWidth === '' ? '' : 'Must be a number.'
        }

        if ('originalHeight' in fieldValues) {
            temp.originalHeight = fieldValues.originalHeight.match(/^[0-9]*$/g) || fieldValues.originalHeight === '' ? '' : 'Must be a number.'
        }

        if ('newSize' in fieldValues) {
            temp.newSize = fieldValues.newSize.match(/^[0-9]*$/g) || fieldValues.newSize === '' ? '' : 'Must be a number.'
        }

        setErrors({
            ...temp,
        })
    }

    const handleFocus = (e) => {
        e.target.select()
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        if (type === 'checkbox') {
            setValues({
                ...values,
                [name]: checked,
            })
        } else if (name === 'colorType') {
            setValues({
                ...values,
                [name]: value,
                colorSymbol: getColorOptionsInfo(value, 'colorSymbol'),
                themeColor: getColorOptionsInfo(value, 'defaultValue'),
                placeholder: getColorOptionsInfo(value, 'defaultValue'),
            })
        } else if (name === 'selectedType' && values.newSize) {
            const aspectRatio = values.aspectRatio.split(':')

            setValues({
                ...values,
                [name]: value,
                newWidth: values.newHeight,
                newHeight: values.newWidth,
                aspectRatio: `${aspectRatio[1]}:${aspectRatio[0]}`,
                dimensions: `${values.newHeight} x ${values.newWidth}`,
            })
        } else if (name === 'originalWidth' || name === 'originalHeight' || name === 'newSize') {
            validate({ [name]: value })

            const isValid = Object.values(errors).every((x) => x === '')

            if (!isNaN(value) && isValid) {
                setValues({
                    ...values,
                    [name]: value,
                })
            } else {
                setValues({
                    ...values,
                    [name]: '',
                })
            }

            const isCalculable =
                (!isNaN(value) && isValid && values.originalWidth && values.originalHeight && value !== '') ||
                (!isNaN(value) && isValid && values.originalWidth && values.newSize && value !== '') ||
                (!isNaN(value) && isValid && values.originalHeight && values.newSize && value !== '')
                    ? true
                    : false

            if (isCalculable) {
                calculateNumbers(name, value)
            }
        } else {
            setValues({
                ...values,
                [name]: value,
            })
        }
    }

    const handleBlur = (e) => {
        const { name, value } = e.target

        validate({ [name]: value })
    }

    const calculateNumbers = useCallback(
        (name, value) => {
            const { newWidth, newHeight, aspectRatio, aspectMultiplier } = getAspectNumbers({ ...values, [name]: value })

            const hasDimensions = !!newWidth && !!newHeight && !!values.originalWidth && !!values.originalHeight ? true : false

            setValues({
                ...values,
                [name]: value,
                newWidth,
                newHeight,
                aspectRatio,
                aspectMultiplier,
                dimensions: hasDimensions && values.selectedType === 'width' ? `${newWidth} x ${newHeight}` : hasDimensions && values.selectedType === 'height' ? `${newHeight} x ${newWidth}` : '',
            })
        },
        [values]
    )

    const formIsValid = (fieldValues = values) => {
        const isValid = fieldValues?.fullName && fieldValues?.email && fieldValues?.title && fieldValues?.phone && Object.values(errors).every((x) => x === '')

        return isValid
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (formIsValid()) {
            setFormSubmitted(true)
        } else {
            setFormSubmitted(false)
        }
    }

    return {
        values,
        errors,
        formSubmitted,
        formIsValid,
        handleFocus,
        handleChange,
        handleBlur,
        handleSubmit,
    }
}
