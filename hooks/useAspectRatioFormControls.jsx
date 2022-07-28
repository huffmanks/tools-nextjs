import { useCallback, useState } from 'react'

import { getAspectNumbers } from '../utilities/getAspectNumbers'

export const useAspectRatioFormControls = (initialValues) => {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('originalWidth' in fieldValues) {
            temp.originalWidth = fieldValues.originalWidth.match(/^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/) || fieldValues.originalWidth === '' ? '' : 'Must be a number.'
        }

        if ('originalHeight' in fieldValues) {
            temp.originalHeight = fieldValues.originalHeight.match(/^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/) || fieldValues.originalHeight === '' ? '' : 'Must be a number.'
        }

        if ('newSize' in fieldValues) {
            temp.newSize = fieldValues.newSize.match(/^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/) || fieldValues.newSize === '' ? '' : 'Must be a number.'
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

        if (name === 'selectedType' && values.newSize) {
            const { newWidth, newHeight, aspectRatio, dimensions } = getAspectNumbers({ ...values, [name]: value })

            setValues({
                ...values,
                [name]: value,
                newWidth,
                newHeight,
                aspectRatio,
                dimensions,
            })
        } else if (name === 'originalWidth' || name === 'originalHeight' || name === 'newSize') {
            validate({ [name]: value })

            const isValid = Object.values(errors).every((x) => x === '')

            if (!isNaN(value) && isValid) {
                const hasValue = value !== ''
                const isOriginal = name === 'originalWidth' || name === 'originalHeight'

                setValues({
                    ...values,
                    [name]: value,
                    newWidth: hasValue ? values.newWidth : '',
                    newHeight: hasValue ? values.newHeight : '',
                    aspectRatio: !hasValue && isOriginal ? '' : values.aspectRatio,
                    aspectMultiplier: !hasValue && isOriginal ? '' : values.aspectMultiplier,
                    dimensions: values.newWidth && values.newHeight ? `${values.newWidth} x ${values.newHeight}` : '',
                })
            } else {
                setValues((prev) => ({
                    ...values,
                    [name]: prev[name],
                }))
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

    const handleBlur = () => {
        setErrors({})
    }

    const calculateNumbers = useCallback(
        (name, value) => {
            const { newWidth, newHeight, aspectRatio, aspectMultiplier, dimensions } = getAspectNumbers({ ...values, [name]: value })

            setValues({
                ...values,
                [name]: value,
                newWidth,
                newHeight,
                aspectRatio,
                aspectMultiplier,
                dimensions,
            })
        },
        [values]
    )

    return {
        values,
        errors,
        handleFocus,
        handleChange,
        handleBlur,
    }
}
