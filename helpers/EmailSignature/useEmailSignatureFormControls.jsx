import { useState } from 'react'

import { initialValues } from '../../constants/emailSignature'
import { getColorOptionsInfo } from './getEmailThemeOptions'

export const useEmailSignatureFormControls = () => {
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

        setErrors({
            ...temp,
        })
    }

    const handleFocus = (e) => {
        e.target.select()
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormSubmitted(false)

        if (name === 'colorType') {
            setValues({
                ...values,
                [name]: value,
                colorSymbol: getColorOptionsInfo(value, 'colorSymbol'),
                themeColor: getColorOptionsInfo(value, 'defaultValue'),
                placeholder: getColorOptionsInfo(value, 'defaultValue'),
            })
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
