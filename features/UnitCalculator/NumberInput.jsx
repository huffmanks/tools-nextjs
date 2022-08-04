import { TextField } from '@mui/material'

const NumberInput = ({ inputLabel, inputName, inputValue, focusHandler, changeHandler }) => {
    return (
        <>
            <TextField
                fullWidth
                variant='outlined'
                label={inputLabel}
                name={inputName}
                value={inputValue}
                onFocus={focusHandler}
                onChange={changeHandler}
                autoComplete='none'
                sx={{
                    '& fieldset': {
                        borderTopRightRadius: {
                            xs: 4,
                            md: 0,
                        },
                        borderBottomLeftRadius: {
                            xs: 0,
                            md: 4,
                        },
                        borderBottomRightRadius: 0,
                        borderBottomColor: {
                            xs: 'transparent',
                            md: 'rgba(255, 255, 255, 0.23)',
                        },
                        borderRightColor: {
                            xs: 'rgba(255, 255, 255, 0.23)',
                            md: 'transparent',
                        },
                    },
                }}
            />
        </>
    )
}

export default NumberInput
