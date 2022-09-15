import { useState } from 'react'

import { initialValues } from '../constants/themeColorOptions'
import { getColorOptionsInfo } from '../utilities/getThemeColorOptions'

export const useThemeColor = () => {
    const [values, setValues] = useState(initialValues)

    const handleFocus = (e) => {
        e.target.select()
    }

    const handleChange = (e) => {
        const { name, value } = e.target

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

    return {
        values,
        handleFocus,
        handleChange,
    }
}
