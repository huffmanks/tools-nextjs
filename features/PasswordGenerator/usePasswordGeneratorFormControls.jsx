import { useState } from 'react'
import { generateKey } from '../../utilities/generateKey'
import { initialValues } from '../../constants/passwordGenerator'

import { generatePassword } from './generatePassword'

export const usePasswordGeneratorFormControls = () => {
    const [values, setValues] = useState(initialValues)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        setValues({
            ...values,
            [name]: type === 'checkbox' ? checked : value,
        })
    }

    const handleSlider = (e, newValue) => {
        setValues({
            ...values,
            slider: Number(newValue),
        })
    }

    const handleClick = () => {
        if (values.passwordType === 'password') {
            const password = generatePassword(values.symbols, values.numbers, values.lowerCase, values.upperCase, values.excludeSimilar, values.slider)

            setValues({
                ...values,
                password,
            })
        }

        if (values.passwordType === 'keygen') {
            const keygen = generateKey()

            setValues({
                ...values,
                keygen,
            })
        }
    }

    const handleShowPassword = () => {
        setValues((prev) => ({
            ...values,
            showPassword: !prev.showPassword,
        }))
    }

    return {
        values,
        handleChange,
        handleSlider,
        handleClick,
        handleShowPassword,
    }
}
