import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { initialValues, measurements } from '../constants/unitConvert'

export const useUnitFormControls = () => {
    const router = useRouter()
    const { query } = router

    const [loading, setLoading] = useState(!router.isReady)

    const typeQuery = query.type?.toLowerCase() ?? query.t?.toLowerCase()
    const numQuery = query.num ?? query.n
    const unitQuery = query.unit?.toLowerCase() ?? query.u?.toLowerCase()

    const [values, setValues] = useState(initialValues)

    const [currentUnits, setCurrentUnits] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === 'measurement') {
            const newOptions = measurements
                .filter((arr) => arr.type === value)
                .map((obj) => obj.units)
                .flat(1)

            setCurrentUnits(newOptions)

            setValues({
                measurement: value,
                numInput: '',
                unitSelection: newOptions[0].unit,
            })
        } else {
            setValues({
                ...values,
                [name]: value,
            })
        }
    }

    const handleFocus = (e) => {
        e.target.select()
    }

    useEffect(() => {
        const getType = () => {
            if (!typeQuery) {
                return 'digitalStorage'
            } else {
                if (typeQuery.startsWith('len') || typeQuery === '2') {
                    return 'length'
                } else if (typeQuery.startsWith('vol') || typeQuery === '3') {
                    return 'volume'
                } else if (typeQuery.startsWith('tem') || typeQuery === '4') {
                    return 'temperature'
                } else if (typeQuery.startsWith('tim') || typeQuery === '5') {
                    return 'time'
                } else if (typeQuery.startsWith('wei') || typeQuery === '6') {
                    return 'weight'
                } else {
                    return 'digitalStorage'
                }
            }
        }

        const levelType = getType()

        const level = measurements
            .filter((measure) => measure.type === levelType)
            .map((item) => item.units)
            .flat()

        let unitTemp

        if (unitQuery) {
            unitTemp = level
                .filter((item) => {
                    return item.short.includes(unitQuery) || item.unit.includes(unitQuery) || unitQuery === item.id.toString()
                })
                .map((item) => item.unit)
        }

        unitTemp = (levelType === 'length' && unitQuery === 'm') || (levelType === 'length' && unitQuery === 'mi') || (levelType === 'length' && unitQuery === 'mil') ? 'miles' : unitTemp

        setCurrentUnits(level)
        setValues((values) => ({
            ...values,
            measurement: levelType,
            numInput: !isNaN(parseInt(numQuery)) ? numQuery : '',
            unitSelection: unitTemp?.length && unitTemp !== undefined ? unitTemp : level[0].unit,
            isQuery: true,
        }))
    }, [typeQuery, numQuery, unitQuery])

    useEffect(() => {
        if (values.isQuery) {
            setTimeout(() => {
                setLoading(false)
            }, 100)
        }
    }, [values.isQuery])

    return { loading, values, currentUnits, handleChange, handleFocus }
}
