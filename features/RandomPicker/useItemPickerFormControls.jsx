import { useRef, useState } from 'react'
import * as XLSX from 'xlsx'

import { useGlobalState } from '../../hooks/useContext'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'

import { generateSeparatedStrings } from './generateSeparatedStrings'
import { generateRandomNumbers } from '../../utilities/generateRandomNumbers'

import { initialValues } from '../../constants/itemPicker'

export const useItemPickerFormControls = () => {
    const fileRef = useRef(null)
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

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()

        setValues({
            ...values,
            isProcessing: true,
        })

        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result)
            const workbook = XLSX.read(data, { type: 'array' })
            const worksheet = workbook.Sheets[workbook.SheetNames[0]]
            const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

            setValues({
                ...values,
                fileName: file.name,
                selectedRows: rows,
                isProcessing: false,
            })
        }

        reader.readAsArrayBuffer(file)
    }

    const handleRandomSelection = (e) => {
        e.preventDefault()

        const headerRow = values.selectedRows[0]
        const dataRows = values.selectedRows.slice(1)

        const shuffledRows = [...dataRows].sort(() => Math.random() - Math.random())
        const selected = []
        const selectedSet = new Set()

        for (const row of shuffledRows) {
            if (!selectedSet.has(JSON.stringify(row))) {
                selected.push(row)
                selectedSet.add(JSON.stringify(row))
            }

            if (selected.length >= values.total) {
                break
            }
        }

        const outputRows = [headerRow, ...selected]

        const workbook = XLSX.utils.book_new()
        const worksheet = XLSX.utils.aoa_to_sheet(outputRows)
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Selected Rows')

        XLSX.writeFile(workbook, 'selected_rows.xlsx')
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
        fileRef.current.value = ''
        setErrorMessage('')
    }

    return {
        fileRef,
        resultRef,
        values,
        errorMessage,
        setValues,
        handleChange,
        handleBlur,
        handleFileUpload,
        handleRandomSelection,
        handleClick,
        handleCopy,
        handleReset,
    }
}
