import { FormGroup, TextField } from '@mui/material'

import FieldsetContainer from '../FieldsetContainer'

const NumberRange = ({ values, handleChange }) => {
    const isDisabled = values.isLottery

    return (
        <>
            <FieldsetContainer title='Number range' size='medium' helperText={`The results will be between ${values.start} and ${values.end}`}>
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
            </FieldsetContainer>
        </>
    )
}

export default NumberRange
