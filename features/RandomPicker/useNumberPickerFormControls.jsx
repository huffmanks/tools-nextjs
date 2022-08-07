import { useRef, useState } from 'react'

import { useGlobalState } from '../../hooks/useContext'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { generateRandomNumbers } from '../../utilities/generateRandomNumbers'
import { initialValues, megaMillionsValues, powerballValues } from '../../constants/numberPicker'

export const useNumberPickerFormControls = () => {
    const resultRef = useRef(null)

    const { addToast } = useGlobalState()
    const [copy] = useCopyToClipboard(true)

    const [values, setValues] = useState(initialValues)

    const handleChange = (e) => {
        const { value, name, type, checked } = e.target

        if (name === 'total' || name === 'start' || name === 'end') {
            setValues((prev) => ({
                ...values,
                [name]: prev[name] === '' && parseInt(value) === 0 ? '' : value.replace(/[^0-9]/g, ''),
            }))
        } else if (name === 'powerball') {
            setValues((prev) => ({
                ...powerballValues,
                isPowerball: !prev.isPowerball,
            }))
        } else if (name === 'megaMillions') {
            setValues((prev) => ({
                ...megaMillionsValues,
                isMegaMillions: !prev.isMegaMillions,
            }))
        } else {
            setValues({
                ...values,
                [name]: type === 'checkbox' ? checked : value,
            })
        }
    }

    const handleClick = () => {
        const { total, unique, sorted, start, end, isPowerball, isMegaMillions } = values

        const lowerNumber = start < end ? start : end
        const higherNumber = start > end ? start : end

        const isLottery = (isPowerball || isMegaMillions) ?? false
        const output = generateRandomNumbers(total, lowerNumber, higherNumber, unique, sorted, isLottery)

        const resultChildren = [...resultRef.current.children].map((child) => child.offsetWidth + 16)
        const resultChildrenWidth = resultChildren.reduce((prev, value) => prev + value, 0)
        const resultWidth = resultRef.current.offsetWidth

        setValues({
            ...values,
            randomNumber: output,
            isLottery,
            lotteryPower: isLottery ? generateRandomNumbers(1, 1, isPowerball ? 26 : 25) : '',
            resultIsCentered: resultChildrenWidth > resultWidth,
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
    }

    return {
        resultRef,
        values,
        setValues,
        handleChange,
        handleClick,
        handleCopy,
        handleReset,
    }
}
