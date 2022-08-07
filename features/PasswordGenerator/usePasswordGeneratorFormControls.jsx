import { useState } from 'react'
import { generatePassword } from './generatePassword'
import { initialValues } from '../../constants/passwordGenerator'

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
        const password = generatePassword(values.symbols, values.numbers, values.lowerCase, values.upperCase, values.excludeSimilar, values.slider)

        setValues({
            ...values,
            password,
        })
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
