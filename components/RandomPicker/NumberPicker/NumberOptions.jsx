import { FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, IconButton, InputAdornment, Switch, TextField } from '@mui/material'

import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

const NumberOptions = ({ values, handleChange, handleDecrease, handleIncrease }) => {
    const isDisabled = values.isPowerball || values.isMegaMillions ? true : false

    return (
        <>
            <FormControl component='fieldset' variant='standard' sx={{ marginBottom: 3 }}>
                <FormLabel component='legend' sx={{ marginBottom: 3 }}>
                    Result options
                </FormLabel>
                <FormGroup
                    sx={{
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: {
                            xs: 0,
                            sm: 2,
                        },
                        marginBottom: 1,
                    }}>
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

                    <FormControlLabel control={<Switch disabled={isDisabled} checked={values.unique} onChange={handleChange} name='unique' />} label='Unique' />
                    <FormControlLabel control={<Switch disabled={isDisabled} checked={values.sorted} onChange={handleChange} name='sorted' />} label='Sorted' />
                </FormGroup>
                <FormHelperText>
                    {values.total
                        ? `There will be ${values.total} result${values.total > 1 ? 's' : ''} that ${values.total > 1 ? 'are' : 'is'} ${values.unique ? 'unique' : 'non-unique'} and ${
                              values.sorted ? 'sorted' : 'unsorted'
                          }.`
                        : 'There will be no results.'}
                </FormHelperText>
            </FormControl>
        </>
    )
}

export default NumberOptions
