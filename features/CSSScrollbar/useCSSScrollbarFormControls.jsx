import { useState } from 'react'

import { initialValues } from '../../constants/cssScrollbar'

export const useCSSScrollbarFormControls = () => {
    const [values, setValues] = useState(initialValues)

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === 'thickness') {
            setValues((prev) => ({
                ...values,
                [name]: prev[name] === '' && parseInt(value) === 0 ? '' : value.replace(/[^0-9]/g, ''),
            }))
        } else {
            setValues({
                ...values,
                [name]: name === 'isTrackTransparent' ? !values.isTrackTransparent : value,
            })
        }
    }

    const handleReset = () => {
        setValues(initialValues)
    }

    return {
        values,
        handleChange,
        handleReset,
    }
}
