import { useItemPickerFormControls } from '../../../features/RandomPicker/useItemPickerFormControls'
import { useCounter } from '../../../hooks/useCounter'

import { Typography } from '@mui/material'

import SEO from '../../../components/common/SEO'
import PageTitle from '../../../components/common/PageTitle'

import ItemForm from '../../../features/RandomPicker/ItemPicker/ItemForm'

const ItemPicker = () => {
    const { fileRef, resultRef, values, setValues, handleChange, handleFileUpload, handleRandomSelection, handleClick, handleCopy, handleReset } = useItemPickerFormControls()
    const { handleDecrease, handleIncrease } = useCounter(values, setValues)

    return (
        <>
            <SEO description='Get a random item from a list.' title='Random Picker' url='/picker/item' imageUrl='/item-picker.png' />

            <PageTitle>Item Picker</PageTitle>

            <Typography paragraph mb={5}>
                Get a random item from a list.
            </Typography>

            <ItemForm
                fileRef={fileRef}
                resultRef={resultRef}
                values={values}
                handleChange={handleChange}
                handleFileUpload={handleFileUpload}
                handleRandomSelection={handleRandomSelection}
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
