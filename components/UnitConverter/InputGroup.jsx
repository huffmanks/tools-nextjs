import { Box, MenuItem, TextField } from '@mui/material'

const InputGroup = ({ inputName, inputValue, selectName, selectValue, focusHandler, changeHandler, clearHandler, unitList }) => {
    return (
        <Box sx={{ mb: 5 }}>
            <TextField
                fullWidth
                variant='outlined'
                value={inputValue}
                name={inputName}
                onFocus={focusHandler}
                onChange={changeHandler}
                autoComplete='none'
                sx={{
                    '& fieldset': {
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        borderBottomColor: 'transparent',
                    },
                }}
            />

            <TextField
                fullWidth
                select
                value={selectValue}
                name={selectName}
                onFocus={clearHandler}
                onChange={changeHandler}
                sx={{
                    '& fieldset': {
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                    },
                }}>
                {unitList.map((option) => (
                    <MenuItem key={option.id} value={option.unit}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    )
}

export default InputGroup
