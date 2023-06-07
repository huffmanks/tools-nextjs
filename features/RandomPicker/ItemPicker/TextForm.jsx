import { Grid, Stack, TextField } from '@mui/material'

import FieldsetContainer from '../FieldsetContainer'
import Counter from '../../../components/common/Counter'
import TextDelimiters from './TextDelimiters'

const TextForm = ({ values, errorMessage, handleChange, handleBlur, handleDecrease, handleIncrease }) => {
    return (
        <Grid item xs={12} md={7}>
            <FieldsetContainer title='Result options' size='large' isFullWidth helperText={`There will be ${values.total} item${values.total > 1 ? 's' : ''} selected from the list.`}>
                <Stack direction={{ xs: 'column', md: 'row' }} gap={{ xs: 0, sm: 2 }} mb={1}>
                    <Counter values={values} handleChange={handleChange} handleDecrease={handleDecrease} handleIncrease={handleIncrease} />
                    <TextDelimiters values={values} handleChange={handleChange} />
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
    )
}

export default TextForm
