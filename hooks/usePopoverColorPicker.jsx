import { useState } from 'react'

export const usePopoverColorPicker = (initialValues) => {
    const [colors, setColors] = useState(initialValues)

    const handleBlur = (name, color) => {
        setColors({
            ...colors,
            [name]: color,
        })
    }

    return {
        colors,
        handleBlur,
    }
}
