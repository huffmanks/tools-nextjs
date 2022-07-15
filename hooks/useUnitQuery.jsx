import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { initialValues, measurements } from '../constants/unitConvert'

export const useUnitQuery = () => {
    const { query } = useRouter()

    const [values, setValues] = useState(initialValues)

    const [currentUnits, setCurrentUnits] = useState([])

    const m = query.m?.toLowerCase()
    const from = query.from?.toLowerCase()
    const to = query.to?.toLowerCase()

    useEffect(() => {
        const type = () => {
            if (!m) {
                return 'digitalStorage'
            } else {
                if (m.startsWith('len') || m === '2') {
                    return 'length'
                } else if (m.startsWith('vol') || m === '3') {
                    return 'volume'
                } else if (m.startsWith('tem') || m === '4') {
                    return 'temperature'
                } else if (m.startsWith('tim') || m === '5') {
                    return 'time'
                } else if (m.startsWith('wei') || m === '6') {
                    return 'weight'
                } else {
                    return 'digitalStorage'
                }
            }
        }

        const levelType = type()

        const level = measurements
            .filter((measure) => measure.type === levelType)
            .map((item) => item.units)
            .flat()

        let fromUnit
        let toUnit

        if (from) {
            fromUnit = level
                .filter((item) => {
                    return item.short.includes(from) || item.unit.includes(from) || from === item.id.toString()
                })
                .map((item) => item.unit)
        }

        fromUnit = (levelType === 'length' && from === 'm') || (levelType === 'length' && from === 'mi') || (levelType === 'length' && from === 'mil') ? 'miles' : fromUnit

        if (to) {
            toUnit = level
                .filter((item) => {
                    return item.short.includes(to) || item.unit.includes(to) || to === item.id.toString()
                })
                .map((item) => item.unit)
        }

        toUnit = (levelType === 'length' && to === 'm') || (levelType === 'length' && to === 'mi') || (levelType === 'length' && to === 'mil') ? 'miles' : toUnit

        setCurrentUnits(level)
        setValues((values) => ({
            ...values,
            measurement: levelType,
            fromSelection: fromUnit?.length && fromUnit !== undefined ? fromUnit : level[0].unit,
            toSelection: toUnit?.length && toUnit !== undefined ? toUnit : level[1].unit,
        }))
    }, [m, from, to])

    return { values, setValues, currentUnits, setCurrentUnits }
}
