import { useRef, useState } from 'react'

import { useGlobalState } from '../../hooks/useContext'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { generateSeparatedStrings } from './generateSeparatedStrings'
import { generateRandomNumbers } from '../../utilities/generateRandomNumbers'
import { initialValues } from '../../constants/itemPicker'

export const useItemPickerFormControls = () => {
    const resultRef = useRef(null)

    const { addToast } = useGlobalState()
    const [copy] = useCopyToClipboard(true)

    const [values, setValues] = useState(initialValues)
    const [errorMessage, setErrorMessage] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target

        if (errorMessage) {
            setErrorMessage('')
        }
        setValues({
            ...values,
            [name]: value,
        })
    }

    const handleBlur = (e) => {
        const { name, value } = e.target
        if (name === 'list') {
            setValues({
                ...values,
                list: value.replace(/\n\s*\n/g, '\n').trim(),
            })
        }
    }

    const handleClick = () => {
        const items = generateSeparatedStrings(values)

        if (items.isError) return setErrorMessage(items.message)

        const lines = items.length

        const randomNumbers = generateRandomNumbers(values.total, 1, lines, true).map((number) => number - 1)

        const output = items.filter((_, i) => randomNumbers.includes(i))

        setValues({
            ...values,
            output,
        })
    }

    const handleCopy = async () => {
        const copySuccess = await copy(resultRef.current)

        if (copySuccess) {
            addToast('Copied to clipboard!')
        }
    }

    const handleReset = () => {
        setValues(initialValues)
        setErrorMessage('')
    }

    return {
        resultRef,
        values,
        errorMessage,
        setValues,
        handleChange,
        handleBlur,
        handleClick,
        handleCopy,
        handleReset,
    }
}
