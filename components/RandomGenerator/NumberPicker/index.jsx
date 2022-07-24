import { generateRandomNumbers } from '../../../utilities/generateRandomNumbers'

import { Button, Grid, Stack } from '@mui/material'

import NumbersIcon from '@mui/icons-material/Numbers'

import Presets from './Presets'
import NumberOptions from './NumberOptions'
import NumberRange from './NumberRange'
import Output from './Output'

const NumberPicker = ({ values, handleChange, setValues }) => {
    const handleDecrease = () => {
        setValues((prev) => ({
            ...values,
            total: parseInt(prev.total) === 1 ? 1 : parseInt(prev.total) - 1,
        }))
    }

    const handleIncrease = () => {
        setValues((prev) => ({
            ...values,
            total: parseInt(prev.total) + 1,
        }))
    }

    const handleClick = () => {
        const { total, unique, sorted, start, end, isPowerball, isMegaMillions } = values
        const lowerNumber = start < end ? start : end
        const higherNumber = start > end ? start : end

        const isLottery = (isPowerball || isMegaMillions) ?? false

        const output = generateRandomNumbers(total, lowerNumber, higherNumber, unique, sorted, isLottery)

        setValues({
            ...values,
            randomNumber: output,
            lottery: isLottery ? generateRandomNumbers(1, 1, isPowerball ? 26 : 25) : '',
        })
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={7} lg={6}>
                    <NumberOptions values={values} handleChange={handleChange} handleDecrease={handleDecrease} handleIncrease={handleIncrease} />
                    <Presets values={values} handleChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={5} lg={6}>
                    <NumberRange values={values} handleChange={handleChange} />

                    <div style={{ marginTop: '32px' }}>
                        <Button
                            size='large'
                            variant='contained'
                            onClick={handleClick}
                            endIcon={<NumbersIcon />}
                            sx={{
                                width: {
                                    xs: '100%',
                                    sm: 'auto',
                                },
                            }}>
                            Generate
                        </Button>
                    </div>
                </Grid>
            </Grid>

            {values?.randomNumber && (
                <Stack direction={{ xs: 'column', md: 'row' }} flexWrap='wrap' gap={2} mt={4} mb={2}>
                    {values.randomNumber.map((number, index) => (
                        <Output key={index} number={number} />
                    ))}
                    {values?.lottery && <Output number={values.lottery} isLottery={true} />}
                </Stack>
            )}
        </>
    )
}

export default NumberPicker
