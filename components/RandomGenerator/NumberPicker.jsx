import { Grid, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, IconButton, InputAdornment, Switch, TextField } from '@mui/material'

import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

const NumberPicker = ({ values, handleChange, setValues }) => {
    const handleDecrease = () => {
        setValues((prev) => ({
            ...values,
            total: parseInt(prev.total) === 1 ? 1 : parseInt(prev.total) - 1,
        }))
    }

    const handleIncrease = () => {
        setValues((prev) => ({
            ...values,
            total: parseInt(prev.total) + 1,
        }))
    }

    return (
        <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
                <FormControl component='fieldset' variant='standard' sx={{ marginBottom: 4 }}>
                    <FormLabel component='legend'>Result options</FormLabel>
                    <FormGroup row sx={{ marginTop: 3, marginBottom: 1 }}>
                        <TextField
                            variant='outlined'
                            label='Total'
                            name='total'
                            value={values.total}
                            onChange={handleChange}
                            autoComplete='none'
                            sx={{
                                width: 150,
                                marginRight: 2,
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
                                            disabled={values.total <= 1}
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

                        <FormControlLabel control={<Switch checked={values.unique} onChange={handleChange} name='unique' />} label='Unique' />
                        <FormControlLabel control={<Switch checked={values.sorted} onChange={handleChange} name='sorted' />} label='Sorted' />
                    </FormGroup>
                    <FormHelperText>
                        {values.total
                            ? `There will be ${values.total} result${values.total > 1 ? 's' : ''} that ${values.total > 1 ? 'are' : 'is'} ${values.unique ? 'unique' : 'non-unique'} and ${
                                  values.sorted ? 'sorted' : 'unsorted'
                              }.`
                            : 'There will be no results.'}
                    </FormHelperText>
                </FormControl>

                <FormControl component='fieldset' variant='standard'>
                    <FormLabel component='legend'>Number range</FormLabel>
                    <FormGroup row sx={{ marginTop: 3, marginBottom: 1 }}>
                        <TextField
                            variant='outlined'
                            label='Start'
                            name='start'
                            value={values.start}
                            onChange={handleChange}
                            autoComplete='none'
                            sx={{
                                width: 185,
                                marginRight: 2,
                            }}
                        />

                        <TextField
                            variant='outlined'
                            label='End'
                            name='end'
                            value={values.end}
                            onChange={handleChange}
                            autoComplete='none'
                            sx={{
                                width: 185,
                            }}
                        />
                    </FormGroup>
                    <FormHelperText>{`The results will be between ${values.start} and ${values.end}`}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <div>output</div>
            </Grid>
        </Grid>
    )
}

export default NumberPicker
