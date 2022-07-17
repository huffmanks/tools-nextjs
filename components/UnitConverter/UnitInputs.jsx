import { measurements } from '../../constants/unitConvert'

import { TextField, MenuItem, Box } from '@mui/material'
import InputGroup from '../../components/UnitConverter/InputGroup'

const UnitInputs = ({ values, currentUnits, handleChange, handleFocus, handleClear }) => {
    return (
        <>
            <TextField fullWidth select label='Measurement' value={values.measurement} name='measurement' onChange={handleChange}>
                {measurements.map((option) => (
                    <MenuItem key={option.id} value={option.type}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <Box
                sx={{
                    display: 'flex',
                    gap: 5,
                    mt: 5,
                    '@media (max-width: 500px)': {
                        display: 'block',
                    },
                }}>
                <InputGroup
                    inputName='fromInput'
                    inputValue={values.fromInput}
                    selectName='fromSelection'
                    selectValue={values.fromSelection}
                    focusHandler={handleFocus}
                    clearHandler={handleClear}
                    changeHandler={handleChange}
                    unitList={currentUnits}
                />

                <InputGroup
                    inputName='toInput'
                    inputValue={values.toInput}
                    selectName='toSelection'
                    selectValue={values.toSelection}
                    focusHandler={handleFocus}
                    clearHandler={handleClear}
                    changeHandler={handleChange}
                    unitList={currentUnits}
                />
            </Box>
        </>
    )
}

export default UnitInputs
