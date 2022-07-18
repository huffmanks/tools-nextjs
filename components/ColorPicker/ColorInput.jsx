import { useState } from 'react'

import { TextField, InputAdornment, IconButton } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const ColorInput = ({ inputLabel, inputName, colorType }) => {
    const [active, setActive] = useState(false)
    const [value, setValue] = useState(colorType)

    const handleFocus = (e) => {
        setActive(true)
        setValue(e.target.value)
    }

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleBlur = () => {
        setActive(false)
        setValue(colorType)
    }

    const handleCopy = () => {
        return navigator.clipboard.writeText(colorType)
    }

    return (
        <>
            <TextField
                fullWidth
                variant='outlined'
                label={inputLabel}
                name={inputName}
                value={active ? value : colorType}
                onFocus={handleFocus}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete='none'
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton aria-label='copy value to clipboard' onClick={handleCopy} edge='end'>
                                <ContentCopyIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </>
    )
}

export default ColorInput
