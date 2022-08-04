import { FormControlLabel, FormGroup, Switch } from '@mui/material'

import FieldsetContainer from '../FieldsetContainer'
import Counter from '../Counter'

const NumberOptions = ({ values, handleChange, handleDecrease, handleIncrease }) => {
    const isDisabled = values.isLottery

    return (
        <>
            <FieldsetContainer
                title='Result options'
                helperText={
                    values.total
                        ? `There will be ${values.total} number${values.total > 1 ? 's' : ''} that ${values.total > 1 ? 'are' : 'is'} ${values.unique ? 'unique' : 'non-unique'} and ${
                              values.sorted ? 'sorted' : 'unsorted'
                          }.`
                        : 'There will be no results.'
                }>
                <FormGroup
                    sx={{
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: {
                            xs: 0,
                            sm: 2,
                        },
                        marginBottom: 1,
                    }}>
                    <Counter values={values} isDisabled={isDisabled} handleChange={handleChange} handleDecrease={handleDecrease} handleIncrease={handleIncrease} />

                    <FormControlLabel control={<Switch disabled={isDisabled} checked={values.unique} onChange={handleChange} name='unique' />} label='Unique' />
                    <FormControlLabel control={<Switch disabled={isDisabled} checked={values.sorted} onChange={handleChange} name='sorted' />} label='Sorted' />
                </FormGroup>
            </FieldsetContainer>
        </>
    )
}

export default NumberOptions
