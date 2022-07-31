import { FormControl, FormGroup, FormHelperText, FormLabel, TextField } from '@mui/material'

const NumberRange = ({ values, handleChange }) => {
    const isDisabled = values.isLottery

    return (
        <>
            <FormControl component='fieldset' variant='standard'>
                <FormLabel component='legend' sx={{ marginBottom: 3 }}>
                    Number range
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
                        label='Start'
                        name='start'
                        value={values.start}
                        onChange={handleChange}
                        autoComplete='none'
                        sx={{
                            flex: 1,
                            '& fieldset': {
                                borderBottomLeftRadius: {
                                    xs: 0,
                                    sm: 4,
                                },
                                borderBottomRightRadius: {
                                    xs: 0,
                                    sm: 4,
                                },
                                borderBottomColor: {
                                    xs: 'transparent',
                                    sm: 'rgba(255, 255, 255, 0.23)',
                                },
                            },
                        }}
                    />

                    <TextField
                        disabled={isDisabled}
                        variant='outlined'
                        label='End'
                        name='end'
                        value={values.end}
                        onChange={handleChange}
                        autoComplete='none'
                        sx={{
                            flex: 1,
                            '& fieldset': {
                                borderTopLeftRadius: {
                                    xs: 0,
                                    sm: 4,
                                },
                                borderTopRightRadius: {
                                    xs: 0,
                                    sm: 4,
                                },
                            },
                        }}
                    />
                </FormGroup>
                <FormHelperText>{`The results will be between ${values.start} and ${values.end}`}</FormHelperText>
            </FormControl>
        </>
    )
}

export default NumberRange
