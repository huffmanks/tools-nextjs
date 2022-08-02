import { IconButton, InputAdornment, TextField } from '@mui/material'

import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

const Counter = ({ isDisabled, values, handleChange, handleDecrease, handleIncrease }) => {
    return (
        <>
            <TextField
                disabled={isDisabled}
                variant='outlined'
                label='Total'
                name='total'
                value={values.total}
                onChange={handleChange}
                autoComplete='none'
                sx={{
                    width: 150,
                    marginBottom: {
                        xs: 2,
                        sm: 0,
                    },
                    input: {
                        textAlign: 'center',
                    },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <IconButton
                                aria-label='decrement one'
                                onClick={handleDecrease}
                                disabled={values.total <= 1 || isDisabled}
                                size='small'
                                edge='end'
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'primary.main',
                                    },
                                }}>
                                <RemoveIcon fontSize='1rem' />
                            </IconButton>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label='increment one'
                                onClick={handleIncrease}
                                disabled={isDisabled}
                                size='small'
                                edge='start'
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'primary.main',
                                    },
                                }}>
                                <AddIcon fontSize='1rem' />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </>
    )
}

export default Counter
