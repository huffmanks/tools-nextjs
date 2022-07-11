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

        const { leftInput, rightInput, leftSelection, rightSelection } = values

        if (name === 'measurement') {
            const newOptions = measurements
                .filter((arr) => arr.type === value)
                .map((obj) => obj.units)
                .flat(1)

            setCurrentUnits(newOptions)

            setValues({
                measurement: value,
                leftInput: '',
                rightInput: '',
                leftSelection: newOptions[0].unit,
                rightSelection: newOptions[1].unit,
            })
        }

        if (name === 'leftInput') {
            setValues({
                ...values,
                leftInput: value,
                rightInput: value ? formatConvertNumber(value, leftSelection, rightSelection) : '',
            })
        }

        if (name === 'rightInput') {
            setValues({
                ...values,
                leftInput: value ? formatConvertNumber(value, rightSelection, leftSelection) : '',
                rightInput: value,
            })
        }

        if (name === 'leftSelection') {
            setValues({
                ...values,
                rightInput: leftInput ? formatConvertNumber(value, leftInput, rightSelection) : rightInput,
                leftSelection: value,
            })
        }

        if (name === 'rightSelection') {
            setValues({
                ...values,
                leftInput: rightInput ? formatConvertNumber(value, rightInput, leftSelection) : leftInput,
                rightSelection: value,
            })
        }
    }

    const handleFocus = (e) => {
        e.target.select()
    }

    const handleClear = () => {
        setValues({
            ...values,
            leftInput: '',
            rightInput: '',
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
                            inputName='leftInput'
                            inputValue={values.leftInput}
                            selectName='leftSelection'
                            selectValue={values.leftSelection}
                            focusHandler={handleFocus}
                            clearHandler={handleClear}
                            changeHandler={handleChange}
                            unitList={currentUnits}
                        />

                        <InputGroup
                            inputName='rightInput'
                            inputValue={values.rightInput}
                            selectName='rightSelection'
                            selectValue={values.rightSelection}
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
                                {values.leftInput && values.rightInput && (
                                    <>
                                        <span>{formatConvertNumber(values.leftInput, values.leftSelection, option.unit)}</span>
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
