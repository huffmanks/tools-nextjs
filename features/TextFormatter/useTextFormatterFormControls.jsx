import { useEffect, useState } from 'react'

import { camelCase, constantCase, headerCase, sentenceCase, snakeCase } from 'change-case'

import { useGlobalState } from '../../hooks/useContext'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { useLocalStorage } from '../../hooks/useLocalStorage'

import { uniqueId } from '../../utilities/uniqueId'
import { titleCase } from './titleCase'
import { LOCAL_STORAGE_KEY, initialValues, checkAllValues, checkNoneValues, outputValues } from '../../constants/textFormatter'

export const useTextFormatterFormControls = () => {
    const uid = uniqueId()

    const { addToast } = useGlobalState()

    const [saved, setSaved] = useLocalStorage(LOCAL_STORAGE_KEY, [])
    const [copy] = useCopyToClipboard()

    const [values, setValues] = useState(initialValues)
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

        if (name === 'output' || name === 'selected') {
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
    }

    const handleSave = () => {
        if (!saved.some((item) => item.value === values.output)) {
            setSaved([
                ...saved,
                {
                    id: uid,
                    value: values.output,
                    label: values.output,
                },
            ])

            handleClear()
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
