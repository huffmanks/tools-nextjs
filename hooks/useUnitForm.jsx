import { formatConvertNumber } from '../utilities/formatConvertNumber'
import { measurements } from '../constants/unitConvert'

export const useUnitForm = (values, setValues, setCurrentUnits) => {
    const handleChange = (e) => {
        const { name, value } = e.target

        const temp = values

        const { fromInput, toInput, fromSelection, toSelection } = temp

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

    return { handleChange, handleFocus, handleClear }
}
