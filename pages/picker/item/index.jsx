import { useItemPickerFormControls } from '../../../features/RandomPicker/useItemPickerFormControls'
import { useCounter } from '../../../hooks/useCounter'

import { Typography } from '@mui/material'

import SEO from '../../../components/common/SEO'
import PageTitle from '../../../components/common/PageTitle'

import ItemForm from '../../../features/RandomPicker/ItemPicker/ItemForm'

const ItemPicker = () => {
    const { resultRef, values, setValues, handleChange, handleClick, handleCopy, handleReset } = useItemPickerFormControls()
    const { handleDecrease, handleIncrease } = useCounter(values, setValues)

    return (
        <>
            <SEO description='Get a random item from a list.' title='Random Picker' url='/picker/item' imageUrl='/item-picker.png' />

            <PageTitle>Item Picker</PageTitle>

            <Typography paragraph mb={5}>
                Get a random item from a list.
            </Typography>

            <ItemForm
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

export default ItemPicker
