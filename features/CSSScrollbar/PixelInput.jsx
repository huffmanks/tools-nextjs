import { InputAdornment, TextField } from '@mui/material'
import React from 'react'

const PixelInput = ({ inputLabel, inputName, inputValue, handleChange }) => {
    return (
        <>
            <TextField
                inputProps={{ maxLength: 2 }}
                variant='outlined'
                label={inputLabel}
                name={inputName}
                value={inputValue}
                onChange={handleChange}
                autoComplete='none'
                InputProps={{
                    endAdornment: <InputAdornment position='end'>px</InputAdornment>,
                }}
                sx={{ width: '100%' }}
                helperText='2 digits'
            />
        </>
    )
}

export default PixelInput
