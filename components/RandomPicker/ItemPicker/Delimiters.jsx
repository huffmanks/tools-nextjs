import { delimiterOptions, delimiterSelects } from '../../../constants/randomPicker'

import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'

const Delimiters = ({ items, handleChange }) => {
    return (
        <Stack direction={{ xs: 'column', xms: 'row' }} gap={2} sx={{ flex: 1, maxWidth: '100%' }}>
            {delimiterSelects.map((select, i) => (
                <FormControl key={i} variant='filled' disabled={i === 1 ? true : false} sx={{ width: '100%' }}>
                    <InputLabel>{select.label}</InputLabel>
                    <Select name={select.value} value={items[select.value]} onChange={handleChange}>
                        {delimiterOptions.map((option, j) => (
                            <MenuItem key={j} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ))}
        </Stack>
    )
}

export default Delimiters
