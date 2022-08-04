import { useItemPickerFormControls } from '../../../helpers/RandomPicker/useItemPickerFormControls'

import { useCounter } from '../../../hooks/useCounter'

import { Grid, Stack, TextField } from '@mui/material'

import FieldsetContainer from '../FieldsetContainer'
import Counter from '../Counter'
import ActionGroup from '../ActionGroup'

import Delimiters from './Delimiters'
import ItemOutput from './ItemOutput'

const ItemPicker = () => {
    const { resultRef, items, errorMessage, setItems, handleChange, handleBlur, handleClick, handleCopy, handleReset } = useItemPickerFormControls()
    const { handleDecrease, handleIncrease } = useCounter(items, setItems)

    return (
        <>
            <Grid container spacing={5}>
                <Grid item xs={12} md={7}>
                    <FieldsetContainer title='Result options' size='large' isFullWidth helperText={`There will be ${items.total} item${items.total > 1 ? 's' : ''} selected from the list.`}>
                        <Stack direction={{ xs: 'column', md: 'row' }} gap={{ xs: 0, sm: 2 }} mb={1}>
                            <Counter values={items} handleChange={handleChange} handleDecrease={handleDecrease} handleIncrease={handleIncrease} />
                            <Delimiters items={items} handleChange={handleChange} />
                        </Stack>
                    </FieldsetContainer>

                    <TextField
                        fullWidth
                        variant='filled'
                        multiline
                        minRows={4}
                        maxRows={8}
                        name='list'
                        label='List Items'
                        placeholder='Insert a list here'
                        value={items.list}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!errorMessage}
                        {...(errorMessage && {
                            error: true,
                            helperText: errorMessage,
                        })}
                        sx={{
                            marginBottom: 4,
                            '& textarea::-webkit-scrollbar': {
                                width: 12,
                            },
                            '& textarea::-webkit-scrollbar-track': {
                                background: '#d5d7d8',
                                borderRadius: 2,
                            },
                            '& textarea::-webkit-scrollbar-thumb': {
                                background: '#676767',
                                borderRadius: 2,
                            },
                            '& textarea::-webkit-scrollbar-thumb:hover': {
                                backgroundColor: 'primary.main',
                            },
                        }}
                    />

                    <ActionGroup isDisabled={!items?.output?.length} generateAria='pick items from a list' handleClick={handleClick} handleCopy={handleCopy} handleReset={handleReset} />
                </Grid>

                <ItemOutput resultRef={resultRef} items={items} />
            </Grid>
        </>
    )
}

export default ItemPicker
