import React, { useState } from 'react'
import * as XLSX from 'xlsx'

const ItemUpload = () => {
    const [selectedRows, setSelectedRows] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)
    const [numSelectedRows, setNumSelectedRows] = useState(10) // Default value of 10

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()

        setIsProcessing(true)

        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result)
            const workbook = XLSX.read(data, { type: 'array' })
            const worksheet = workbook.Sheets[workbook.SheetNames[0]]
            const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
            setSelectedRows(rows)
            setIsProcessing(false)
        }

        reader.readAsArrayBuffer(file)
    }

    const handleRandomSelection = (e) => {
        e.preventDefault()

        const headerRow = selectedRows[0]
        const dataRows = selectedRows.slice(1)

        const shuffledRows = [...dataRows].sort(() => Math.random() - Math.random())
        const selected = []
        const selectedSet = new Set()

        for (const row of shuffledRows) {
            if (!selectedSet.has(JSON.stringify(row))) {
                selected.push(row)
                selectedSet.add(JSON.stringify(row))
            }

            if (selected.length >= numSelectedRows) {
                break
            }
        }

        const outputRows = [headerRow, ...selected]

        const workbook = XLSX.utils.book_new()
        const worksheet = XLSX.utils.aoa_to_sheet(outputRows)
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Selected Rows')

        XLSX.writeFile(workbook, 'selected_rows.xlsx')
    }

    const isButtonDisabled = selectedRows.length === 0 || isProcessing

    return (
        <div style={{ margin: '30px 0' }}>
            <input style={{ padding: 10 }} type='file' onChange={handleFileUpload} />
            <label>
                Number of Selected Rows:
                <input style={{ padding: 10 }} type='number' value={numSelectedRows} onChange={(e) => setNumSelectedRows(Number(e.target.value))} disabled={isProcessing} />
            </label>
            <button style={{ padding: 10 }} onClick={handleRandomSelection} disabled={isButtonDisabled}>
                {isProcessing ? 'Processing...' : 'Select Random Rows'}
            </button>
        </div>
    )
}

export default ItemUpload
