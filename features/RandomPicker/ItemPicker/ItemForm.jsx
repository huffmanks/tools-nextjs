import { Grid } from '@mui/material'

import ActionGroup from '../ActionGroup'

import TextOutput from './TextOutput'
import TextForm from './TextForm'
import UploadForm from './UploadForm'

const ItemForm = ({ resultRef, values, errorMessage, handleChange, handleBlur, handleClick, handleCopy, handleReset, handleDecrease, handleIncrease }) => {
    return (
        <>
            <Grid container spacing={5}>
                <UploadForm values={values} fileName='test.xlsx' handleChange={handleChange} handleDecrease={handleDecrease} handleIncrease={handleIncrease} />
                <TextForm values={values} errorMessage={errorMessage} handleChange={handleChange} handleBlur={handleBlur} handleDecrease={handleDecrease} handleIncrease={handleIncrease} />
                <Grid item xs={12} md={5}>
                    <ActionGroup isDisabled={!values?.output?.length} generateAria='pick items from a list' handleClick={handleClick} handleCopy={handleCopy} handleReset={handleReset} />

                    <TextOutput resultRef={resultRef} values={values} />
                </Grid>
            </Grid>
        </>
    )
}

export default ItemForm
