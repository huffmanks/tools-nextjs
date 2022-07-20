import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { initialValues, measurements } from '../constants/unitConvert'

export const useUnitFormControls = () => {
    const router = useRouter()
    const { query } = router

    const [isLoading, setIsLoading] = useState(true)
    const [values, setValues] = useState(initialValues)
    const [currentUnits, setCurrentUnits] = useState(measurements[0].units)

    const isQuery = router.asPath.includes('?')
    const queryOptions = ['type', 't', 'num', 'n', 'unit', 'u']

    const validQuery = Object.keys(query).every((key) => {
        return queryOptions.includes(key)
    })

    const typeQuery = query.type?.toLowerCase() ?? query.t?.toLowerCase()
    const numQuery = query.num ?? query.n
    const unitQuery = query.unit?.toLowerCase() ?? query.u?.toLowerCase()

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
        setIsLoading(!router.isReady || isQuery ? true : false)
    }, [router, isQuery])

    useEffect(() => {
        if (isQuery && !validQuery) {
            setIsLoading(false)
        }

        if (typeQuery) {
            const level = measurements.find((item) => item.type.startsWith(typeQuery) || parseInt(typeQuery) === item.id)

            const levelType = level?.type.toString()
            const levelUnits = level?.units

            let unitTemp

            if (levelType && unitQuery) {
                unitTemp = levelUnits.find((item) => item.label.toLowerCase().startsWith(unitQuery) || item.short === unitQuery || unitQuery === item.id)?.unit.toString()

                // resolves conflicts
                unitTemp =
                    levelType === 'length' && unitQuery === 'm' ? 'meters' : (levelType === 'length' && unitQuery === 'mi') || (levelType === 'length' && unitQuery === 'mil') ? 'miles' : unitTemp
            }

            if (levelUnits) {
                setCurrentUnits(levelUnits)
            }

            setValues({
                measurement: levelType ?? initialValues.measurement,
                numInput: !isNaN(parseInt(numQuery)) ? numQuery : '',
                unitSelection: unitTemp ?? levelUnits?.[0].unit ?? initialValues.unitSelection,
            })

            setIsLoading(false)
        }
    }, [isQuery, validQuery, typeQuery, numQuery, unitQuery])

    return { isLoading, values, currentUnits, handleChange, handleFocus }
}
