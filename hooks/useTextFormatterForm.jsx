import { useEffect, useState } from 'react'

import { camelCase, constantCase, headerCase, sentenceCase, snakeCase } from 'change-case'
import { useLocalStorage } from './useLocalStorage'
import { uniqueId } from '../utilities/uniqueId'
import { titleCase } from '../utilities/titleCase'
import { initialValues } from '../constants/textFormatter'

export const useTextFormatterForm = () => {
    const [values, setValues] = useState(initialValues)

    const [saved, setSaved] = useLocalStorage('webtools-v1-saved', [])

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
                check_lowerCase: true,
                check_upperCase: true,
                check_capitalCase: true,
                check_sentenceCase: true,
                check_camelCase: true,
                check_snakeCase: true,
                check_headerCase: true,
                check_constantCase: true,
            })
        } else {
            setValues({
                ...values,
                check_lowerCase: false,
                check_upperCase: false,
                check_capitalCase: false,
                check_sentenceCase: false,
                check_camelCase: false,
                check_snakeCase: false,
                check_headerCase: false,
                check_constantCase: false,
            })
        }
    }

    const handleCopy = (name) => {
        return navigator.clipboard.writeText(values[name])
    }

    const handleReset = () => {
        setValues({
            ...values,
            output: '',
            selected: '',
            lowerCase: '',
            upperCase: '',
            capitalCase: '',
            sentenceCase: '',
            camelCase: '',
            snakeCase: '',
            headerCase: '',
            constantCase: '',
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
