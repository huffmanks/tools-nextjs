import { FormControl, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'

import ActionGroup from '../ActionGroup'

import TextOutput from './TextOutput'
import TextForm from './TextForm'
import UploadForm from './UploadForm'
import { itemRadios } from '../../../constants/itemPicker'

const ItemForm = ({
    fileRef,
    resultRef,
    values,
    errorMessage,
    handleChange,
    handleBlur,
    handleFileUpload,
    handleRandomSelection,
    handleClick,
    handleCopy,
    handleReset,
    handleDecrease,
    handleIncrease,
}) => {
    const isUpload = values?.listType === 'upload'
    return (
        <>
            <FormControl component='fieldset' sx={{ marginBottom: 3 }}>
                <RadioGroup row defaultValue='upload' name='listType' value={values.listType} onChange={handleChange}>
                    {itemRadios.map(({ value, label }, index) => (
                        <FormControlLabel
                            key={index}
                            value={value}
                            control={
                                <Radio
                                    sx={{
                                        '&.Mui-checked': {
                                            color: 'primary.main',
                                        },
                                    }}
                                />
                            }
                            label={label}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
            <Grid container spacing={5}>
                {isUpload && (
                    <UploadForm fileRef={fileRef} values={values} handleChange={handleChange} handleFileUpload={handleFileUpload} handleDecrease={handleDecrease} handleIncrease={handleIncrease} />
                )}
                {!isUpload && (
                    <TextForm values={values} errorMessage={errorMessage} handleChange={handleChange} handleBlur={handleBlur} handleDecrease={handleDecrease} handleIncrease={handleIncrease} />
                )}
                <Grid item xs={12} md={!isUpload ? 5 : 12}>
                    <ActionGroup
                        isCopyDisabled={!isUpload && !values?.output?.length}
                        isGenerateDisabled={(isUpload && values?.selectedRows?.length === 0) || values?.isProcessing}
                        isUpload={isUpload}
                        generateAria='pick items from a list'
                        handleRandomSelection={handleRandomSelection}
                        handleClick={handleClick}
                        handleCopy={handleCopy}
                        handleReset={handleReset}
                    />

                    {!isUpload && <TextOutput resultRef={resultRef} values={values} />}
                </Grid>
            </Grid>
        </>
    )
}

export default ItemForm
