import { Box, Grid, Stack, TextField } from '@mui/material'

import FieldsetContainer from '../FieldsetContainer'
import Counter from '../Counter'
import ActionGroup from '../ActionGroup'

import Delimiters from './Delimiters'
import OutputMessage from '../../../components/common/OutputMessage'

const ItemForm = ({ resultRef, values, errorMessage, handleChange, handleBlur, handleClick, handleCopy, handleReset, handleDecrease, handleIncrease }) => {
    return (
        <>
            <Grid container spacing={5}>
                <Grid item xs={12} md={7}>
                    <FieldsetContainer title='Result options' size='large' isFullWidth helperText={`There will be ${values.total} item${values.total > 1 ? 's' : ''} selected from the list.`}>
                        <Stack direction={{ xs: 'column', md: 'row' }} gap={{ xs: 0, sm: 2 }} mb={1}>
                            <Counter values={values} handleChange={handleChange} handleDecrease={handleDecrease} handleIncrease={handleIncrease} />
                            <Delimiters values={values} handleChange={handleChange} />
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
                        value={values.list}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!errorMessage}
                        {...(errorMessage && {
                            error: true,
                            helperText: errorMessage,
                        })}
                        sx={{
                            marginBottom: 1,
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
                </Grid>
                <Grid item xs={12} md={5}>
                    <ActionGroup isDisabled={!values?.output?.length} generateAria='pick items from a list' handleClick={handleClick} handleCopy={handleCopy} handleReset={handleReset} />

                    <Box sx={{ marginTop: 5 }}>
                        {values?.output?.length > 0 ? (
                            <div ref={resultRef}>
                                {values.output.map((item, i) => (
                                    <div key={i}>{item}</div>
                                ))}
                            </div>
                        ) : (
                            <OutputMessage message='No items to show.' />
                        )}
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default ItemForm
