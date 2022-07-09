import { useEffect, useState } from 'react'

import { camelCase, constantCase, headerCase, sentenceCase, snakeCase } from 'change-case'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { uniqueId } from '../../utilities/uniqueId'
import { titleCase } from '../../utilities/titleCase'
import { initialValues } from '../../constants/textFormatter'

import { Grid } from '@mui/material'

import SEO from '../../components/layout/SEO'
import PageTitle from '../../components/layout/PageTitle'
import Textarea from '../../components/TextFormatter/Textarea'
import ActionGroup from '../../components/TextFormatter/ActionGroup'
import Cards from '../../components/TextFormatter/Cards'

const TextFormatter = () => {
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
        setValues(initialValues)
    }

    useEffect(() => {
        const filtered = Object.fromEntries(Object.entries(values).filter(([key, value]) => key.startsWith('check_') && value === true))

        const filtArr = Object.keys(filtered).map((item) => item.replace('check_', ''))

        setCheckedCards(filtArr)
    }, [values])

    return (
        <>
            <SEO description='Format text to any case.' title='Text Formatter' url='/text-formatter' />
            <PageTitle>Text Formatter</PageTitle>

            <Grid container spacing={5}>
                <Textarea values={values} handleChange={handleChange} handleClear={handleClear} />
                <ActionGroup values={values} saved={saved} handleChange={handleChange} handleReset={handleReset} handleSave={handleSave} />
                <Cards values={values} checkedCards={checkedCards} checkAll={checkAll} handleCheckAll={handleCheckAll} handleChange={handleChange} handleCopy={handleCopy} />
            </Grid>
        </>
    )
}

export default TextFormatter
