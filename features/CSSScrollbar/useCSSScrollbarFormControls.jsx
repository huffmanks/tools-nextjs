import { useState } from 'react'

import { initialValues } from '../../constants/cssScrollbar'

export const useCSSScrollbarFormControls = () => {
    const [values, setValues] = useState(initialValues)

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === 'thickness' || name === 'trackRadius' || name === 'trackBorderWidth' || name === 'thumbRadius' || name === 'thumbBorderWidth') {
            setValues((prev) => ({
                ...values,
                [name]: prev[name] === '' && parseInt(value) === 0 ? '' : value.replace(/[^0-9]/g, ''),
            }))
        } else if (name === 'axis') {
            setValues({
                ...values,
                [name]: value,
                thickness: 10,
            })
        } else {
            setValues({
                ...values,
                [name]: name === 'isTrackTransparent' ? !values.isTrackTransparent : value,
            })
        }
    }

    return {
        values,
        handleChange,
    }
}
