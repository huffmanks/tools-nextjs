import { useRef, useState } from 'react'

import { useGlobalState } from '../../hooks/useGlobalState'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { generateSeparatedStrings } from './generateSeparatedStrings'
import { generateRandomNumbers } from '../../utilities/generateRandomNumbers'
import { initialItems } from '../../constants/randomPicker'

export const useItemPickerFormControls = () => {
    const resultRef = useRef(null)

    const { addToast } = useGlobalState()
    const [copy] = useCopyToClipboard(true)

    const [items, setItems] = useState(initialItems)
    const [errorMessage, setErrorMessage] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target

        if (errorMessage) {
            setErrorMessage('')
        }
        setItems({
            ...items,
            [name]: value,
        })
    }

    const handleBlur = (e) => {
        const { name, value } = e.target
        if (name === 'list') {
            setItems({
                ...items,
                list: value.replace(/\n\s*\n/g, '\n').trim(),
            })
        }
    }

    const handleClick = () => {
        const values = generateSeparatedStrings(items)

        if (values.isError) return setErrorMessage(values.message)

        const lines = values.length

        const randomNumbers = generateRandomNumbers(items.total, 1, lines, true).map((number) => number - 1)

        const output = values.filter((_, i) => randomNumbers.includes(i))

        setItems({
            ...items,
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
        setItems(initialItems)
        setErrorMessage('')
    }

    return {
        resultRef,
        items,
        errorMessage,
        setItems,
        handleChange,
        handleBlur,
        handleClick,
        handleCopy,
        handleReset,
    }
}
