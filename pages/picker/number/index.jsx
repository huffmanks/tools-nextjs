import { useNumberPickerFormControls } from '../../../helpers/RandomPicker/useNumberPickerFormControls'
import { useCounter } from '../../../hooks/useCounter'

import { Typography } from '@mui/material'

import SEO from '../../../components/common/SEO'
import PageTitle from '../../../components/common/PageTitle'

import NumberForm from '../../../features/RandomPicker/NumberPicker/NumberForm'

const NumberPicker = () => {
    const { resultRef, values, setValues, handleChange, handleClick, handleCopy, handleReset } = useNumberPickerFormControls()
    const { handleDecrease, handleIncrease } = useCounter(values, setValues)

    return (
        <>
            <SEO description='Get a random number from a range.' title='Number Picker' url='/picker/number' imageUrl='/number-picker.png' />

            <PageTitle>Number Picker</PageTitle>

            <Typography paragraph mb={5}>
                Get a random number from a range.
            </Typography>

            <NumberForm
                resultRef={resultRef}
                values={values}
                handleChange={handleChange}
                handleClick={handleClick}
                handleCopy={handleCopy}
                handleReset={handleReset}
                handleDecrease={handleDecrease}
                handleIncrease={handleIncrease}
            />
        </>
    )
}

export default NumberPicker
