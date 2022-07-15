import { useUnitQuery } from '../../hooks/useUnitQuery'
import { formatConvertNumber } from '../../utilities/formatConvertNumber'
import { measurements } from '../../constants/unitConvert'

import { Stack, TextField, MenuItem, Box } from '@mui/material'

import SEO from '../../components/layout/SEO'
import PageTitle from '../../components/layout/PageTitle'
import InputGroup from '../../components/UnitConverter/InputGroup'

import styles from '../../styles/UnitConverter.module.css'

const UnitConverter = () => {
    const { values, setValues, currentUnits, setCurrentUnits } = useUnitQuery()

    const handleChange = (e) => {
        const { name, value } = e.target

        const { fromInput, toInput, fromSelection, toSelection } = values

        if (name === 'measurement') {
            const newOptions = measurements
                .filter((arr) => arr.type === value)
                .map((obj) => obj.units)
                .flat(1)

            setCurrentUnits(newOptions)

            setValues({
                measurement: value,
                fromInput: '',
                toInput: '',
                fromSelection: newOptions[0].unit,
                toSelection: newOptions[1].unit,
            })
        }

        if (name === 'fromInput') {
            setValues({
                ...values,
                fromInput: value,
                toInput: value ? formatConvertNumber(value, fromSelection, toSelection) : '',
            })
        }

        if (name === 'toInput') {
            setValues({
                ...values,
                fromInput: value ? formatConvertNumber(value, toSelection, fromSelection) : '',
                toInput: value,
            })
        }

        if (name === 'fromSelection') {
            setValues({
                ...values,
                toInput: fromInput ? formatConvertNumber(value, fromInput, toSelection) : toInput,
                fromSelection: value,
            })
        }

        if (name === 'toSelection') {
            setValues({
                ...values,
                fromInput: toInput ? formatConvertNumber(value, toInput, fromSelection) : fromInput,
                toSelection: value,
            })
        }
    }

    const handleFocus = (e) => {
        e.target.select()
    }

    const handleClear = () => {
        setValues({
            ...values,
            fromInput: '',
            toInput: '',
        })
    }

    return (
        <>
            <SEO description='Convert different unit types.' title='Convert Units' url='/unit-converter' />
            <PageTitle>Convert Units</PageTitle>

            <Box
                sx={{
                    display: 'flex',
                    gap: 5,
                    '@media (max-width: 899px)': {
                        display: 'block',
                    },
                }}>
                <Box sx={{ flex: '0 0 50%' }}>
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
                </Box>
                <Box>
                    <Stack spacing={2}>
                        {currentUnits.map((option) => (
                            <div className={styles['stack-item']} key={option.id}>
                                <span>{option.label}</span>
                                <span className={styles['stack-pipe']}>|</span>
                                {values.fromInput && values.toInput && (
                                    <>
                                        <span>{formatConvertNumber(values.fromInput, values.fromSelection, option.unit)}</span>
                                    </>
                                )}

                                <span> {option.short}</span>
                            </div>
                        ))}
                    </Stack>
                </Box>
            </Box>
        </>
    )
}

export default UnitConverter
