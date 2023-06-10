import { forwardRef, useCallback, useRef, useState } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'

import { Box, InputAdornment, Stack, TextField, Typography } from '@mui/material'

import { useClickOutside } from '../../hooks/useClickOutside'
import { initialValues } from '../../constants/popoverColorPicker'

const HexColorInputCustom = forwardRef(function HexColorInputCustom(props, ref) {
    const { inputRef, value, ...others } = props
    return <HexColorInput {...others} color={value} />
})

const PopoverColorPicker = ({ label, name, helperText, handleBlur }) => {
    const popover = useRef(null)

    const [color, setColor] = useState(initialValues[name] || '#5b21b6')
    const [isOpen, toggle] = useState(false)

    const close = useCallback(() => toggle(false), [])
    useClickOutside(popover, close)

    return (
        <div>
            {label && (
                <Typography variant='subtitle1' mb={1} mt={2}>
                    {label}
                </Typography>
            )}

            <Stack flexDirection='row' alignItems='center' sx={{ position: 'relative', gap: 2 }}>
                <Box sx={{ width: '28px', height: '28px', backgroundColor: color, border: '2px solid #fefefe', borderRadius: 1, cursor: 'pointer' }} onClick={() => toggle((prev) => !prev)}></Box>
                {isOpen && (
                    <Box ref={popover} sx={{ position: 'absolute', top: 'calc(100% + 15px)', left: 0, borderRadius: 1, boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)', zIndex: 10 }}>
                        <HexColorPicker color={color} onChange={setColor} onBlur={() => handleBlur(name, color)} />
                    </Box>
                )}

                <TextField
                    variant='standard'
                    name={name}
                    value={color}
                    helperText={helperText}
                    onChange={setColor}
                    onBlur={() => handleBlur(name, color)}
                    InputProps={{
                        inputComponent: HexColorInputCustom,
                        startAdornment: <InputAdornment position='start'>#</InputAdornment>,
                    }}
                />
            </Stack>
        </div>
    )
}
export default PopoverColorPicker
