import { Box, MenuItem, TextField } from '@mui/material'

const InputGroup = ({ inputName, inputValue, selectName, selectValue, focusHandler, changeHandler, clearHandler, unitList }) => {
    return (
        <Box sx={{ mb: 5 }}>
            <TextField className='group top' fullWidth variant='outlined' value={inputValue} name={inputName} onFocus={focusHandler} onChange={changeHandler} autoComplete='none' />

            <TextField className='group bottom' fullWidth select value={selectValue} name={selectName} onFocus={clearHandler} onChange={changeHandler}>
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
