import { useEffect, useState } from 'react'

import { camelCase, constantCase, headerCase, sentenceCase, snakeCase } from 'change-case'

import { useGlobalState } from '../../hooks/useGlobalState'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { useLocalStorage } from '../../hooks/useLocalStorage'

import { uniqueId } from '../../utilities/uniqueId'
import { titleCase } from './titleCase'
import { initialValues, checkAllValues, checkNoneValues, outputValues } from '../../constants/textFormatter'

export const useTextFormatterFormControls = () => {
    const { addToast } = useGlobalState()

    const [saved, setSaved] = useLocalStorage('webtools-v1-text-formatter-saved', [])
    const [copy] = useCopyToClipboard()

    const [values, setValues] = useState(initialValues)
    const [savedId, setSavedId] = useState(uniqueId)
    const [checkedCards, setCheckedCards] = useState([])
    const [checkAll, setCheckAll] = useState(false)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        if (type === 'checkbox') {
            setValues({
                ...values,
                [name]: checked,
            })
        }

        if (type === 'textarea' || name === 'selected') {
            setValues({
                ...values,
                [name]: value,
                output: value,
                lowerCase: value.toLowerCase(),
                upperCase: value.toUpperCase(),
                capitalCase: titleCase(value.toLowerCase()),
                sentenceCase: sentenceCase(value),
                camelCase: camelCase(value),
                snakeCase: snakeCase(value),
                headerCase: headerCase(value).toLowerCase(),
                constantCase: constantCase(value),
            })
        }
    }

    const handleCheckAll = () => {
        setCheckAll((prev) => !prev)
        if (!checkAll) {
            setValues({
                ...values,
                ...checkAllValues,
            })
        } else {
            setValues({
                ...values,
                ...checkNoneValues,
            })
        }
    }

    const handleCopy = async (name) => {
        const copySuccess = await copy(values[name])

        if (copySuccess) {
            addToast('Copied to clipboard!')
        }
    }

    const handleReset = () => {
        setValues({
            ...values,
            ...outputValues,
        })
        setSaved([])
        setSavedId(1)
    }

    const handleSave = () => {
        if (!saved.some((item) => item.value === values.output)) {
            setSaved([
                ...saved,
                {
                    id: savedId,
                    value: values.output,
                    label: values.output,
                },
            ])

            setSavedId((prev) => prev + 1)

            addToast('Item saved for later!')
        }
    }

    const handleClear = () => {
        setValues({
            ...values,
            output: '',
        })
    }

    useEffect(() => {
        const filtered = Object.fromEntries(Object.entries(values).filter(([key, value]) => key.startsWith('check_') && value === true))

        const filtArr = Object.keys(filtered).map((item) => item.replace('check_', ''))

        setCheckedCards(filtArr)
    }, [values])

    return { values, saved, checkedCards, checkAll, handleChange, handleSave, handleCheckAll, handleCopy, handleClear, handleReset }
}
