import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { initialValues, measurements } from '../constants/unitConvert'

export const useUnitQuery = () => {
    const { query } = useRouter()

    const [values, setValues] = useState(initialValues)

    const [currentUnits, setCurrentUnits] = useState([])

    const m = query.m?.toLowerCase()
    const left = query.left?.toLowerCase()
    const right = query.right?.toLowerCase()

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

        let leftUnit
        let rightUnit

        if (left) {
            leftUnit = level
                .filter((item) => {
                    return item.short.includes(left) || item.unit.includes(left) || left === item.id.toString()
                })
                .map((item) => item.unit)
        }

        if (right) {
            rightUnit = level
                .filter((item) => {
                    return item.short.includes(right) || item.unit.includes(right) || right === item.id.toString()
                })
                .map((item) => item.unit)
        }

        setCurrentUnits(level)
        setValues((values) => ({
            ...values,
            measurement: levelType,
            leftSelection: leftUnit?.length && leftUnit !== undefined ? leftUnit : level[0].unit,
            rightSelection: rightUnit?.length && rightUnit !== undefined ? rightUnit : level[1].unit,
        }))
    }, [m, left, right])

    return { values, setValues, currentUnits, setCurrentUnits }
}
