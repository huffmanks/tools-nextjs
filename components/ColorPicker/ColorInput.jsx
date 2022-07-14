import { useState } from 'react'

import { TextField, InputAdornment, IconButton } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const ColorInput = ({ colorName, colorType }) => {
    const [active, setActive] = useState(false)
    const [value, setValue] = useState(colorType)

    const isActive = (e) => {
        e.target.select()
        setActive(true)
        setValue(e.target.value)
    }

    const notActive = () => {
        setActive(false)
        setValue(colorType)
    }

    const handleClipboard = () => {
        return navigator.clipboard.writeText(colorType)
    }

    const handleUpdate = (e) => {
        setValue(e.target.value)
    }

    return (
        <>
            <TextField
                fullWidth
                variant='outlined'
                label={colorName}
                name={`${colorName}-input`}
                value={active ? value : colorType}
                onChange={handleUpdate}
                onFocus={isActive}
                onBlur={notActive}
                autoComplete='none'
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton aria-label='copy value to clipboard' onClick={handleClipboard} edge='end'>
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
