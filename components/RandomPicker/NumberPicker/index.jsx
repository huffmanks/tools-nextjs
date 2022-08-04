import { useRef, useState } from 'react'

import { useGlobalState } from '../../../hooks/useGlobalState'
import { useCounter } from '../../../hooks/useCounter'
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard'
import { generateRandomNumbers } from '../../../utilities/generateRandomNumbers'
import { initialValues, megaMillionsValues, powerballValues } from '../../../constants/randomPicker'

import { Grid, Stack } from '@mui/material'

import Presets from './Presets'
import NumberOptions from './NumberOptions'
import NumberRange from './NumberRange'
import ActionGroup from '../ActionGroup'
import Output from './Output'
import OutputMessage from '../../layout/OutputMessage'

const NumberPicker = () => {
    const resultRef = useRef(null)

    const { addToast } = useGlobalState()

    const [copy] = useCopyToClipboard(true)

    const [values, setValues] = useState(initialValues)

    const { handleDecrease, handleIncrease } = useCounter(values, setValues)

    const handleChange = (e) => {
        const { value, name, type, checked } = e.target

        if (name === 'total' || name === 'start' || name === 'end') {
            setValues((prev) => ({
                ...values,
                [name]: prev[name] === '' && parseInt(value) === 0 ? '' : value.replace(/[^0-9]/g, ''),
            }))
        } else if (name === 'powerball') {
            setValues((prev) => ({
                ...powerballValues,
                isPowerball: !prev.isPowerball,
            }))
        } else if (name === 'megaMillions') {
            setValues((prev) => ({
                ...megaMillionsValues,
                isMegaMillions: !prev.isMegaMillions,
            }))
        } else {
            setValues({
                ...values,
                [name]: type === 'checkbox' ? checked : value,
            })
        }
    }

    const handleClick = () => {
        const { total, unique, sorted, start, end, isPowerball, isMegaMillions } = values

        const lowerNumber = start < end ? start : end
        const higherNumber = start > end ? start : end

        const isLottery = (isPowerball || isMegaMillions) ?? false
        const output = generateRandomNumbers(total, lowerNumber, higherNumber, unique, sorted, isLottery)

        const resultChildren = [...resultRef.current.children].map((child) => child.offsetWidth + 16)
        const resultChildrenWidth = resultChildren.reduce((prev, value) => prev + value, 0)
        const resultWidth = resultRef.current.offsetWidth

        setValues({
            ...values,
            randomNumber: output,
            isLottery,
            lotteryPower: isLottery ? generateRandomNumbers(1, 1, isPowerball ? 26 : 25) : '',
            resultIsCentered: resultChildrenWidth > resultWidth,
        })
    }

    const handleCopy = async () => {
        const copySuccess = await copy(resultRef.current)

        if (copySuccess) {
            addToast('Copied to clipboard!')
        }
    }

    const handleReset = () => {
        setValues(initialValues)
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <NumberOptions values={values} handleChange={handleChange} handleDecrease={handleDecrease} handleIncrease={handleIncrease} />

                    <Presets values={values} handleChange={handleChange} />

                    <NumberRange values={values} handleChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ActionGroup isDisabled={!values?.randomNumber?.length} generateAria='generate random numbers' handleClick={handleClick} handleCopy={handleCopy} handleReset={handleReset} />

                    <Stack ref={resultRef} flexDirection='row' justifyContent={values.resultIsCentered ? 'center' : 'flex-start'} flexWrap='wrap' gap={2} mt={5} mb={2}>
                        {values.randomNumber.length > 0 ? (
                            <>
                                {values.randomNumber.map((number, index) => (
                                    <Output key={index} number={number} isLottery={values.isLottery} />
                                ))}
                                {values?.lotteryPower && <Output number={values.lotteryPower} isLottery={values.isLottery} isLotteryPower={true} />}
                            </>
                        ) : (
                            <OutputMessage message='No numbers to show.' />
                        )}
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default NumberPicker
