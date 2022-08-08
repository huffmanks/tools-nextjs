import { useLists } from '../../hooks/useContext'
import { useTodoListFormControls } from './useTodoListFormControls'

import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'

const Edit = ({ listId }) => {
    const { lists } = useLists()
    const initialList = lists.find((list) => list.id === listId)

    const { list, items, isFocused, errors, formIsValid, handleFocus, handleChange, handleBlur, handleRemoveItem, handleSubmit } = useTodoListFormControls(initialList)

    return (
        <>
            <Typography paragraph mb={5}>
                {`Edit ${list.title}`}
            </Typography>

            <Stack gap={3}>
                <TextField
                    required
                    fullWidth
                    variant='outlined'
                    label='List Title'
                    placeholder={initialList.title}
                    name='title'
                    value={list.title}
                    onChange={handleChange}
                    autoComplete='none'
                    error={errors.title}
                    helperText=''
                    {...(errors.title && {
                        error: true,
                        helperText: 'This field is required.',
                    })}
                />

                <Stack direction={{ xs: 'column', md: 'column' }} gap={3}>
                    {list.items.map((item, index) => (
                        <TextField
                            key={item.id}
                            fullWidth
                            variant='outlined'
                            placeholder={`Item ${index + 1}`}
                            name={item.id.toString()}
                            value={isFocused ? items[item.id.toString()] : item.text}
                            onFocus={handleFocus}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete='none'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            variant='contained'
                                            edge='start'
                                            aria-label='remove item'
                                            onClick={() => handleRemoveItem(item.id)}
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: 'primary.main',
                                                },
                                            }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    ))}
                </Stack>

                <Box>
                    <Button fullWidth variant='contained' size='large' disabled={!formIsValid} aria-label='create todo list' onClick={handleSubmit} endIcon={<SaveIcon />} sx={{ marginTop: 2 }}>
                        Save
                    </Button>
                </Box>
            </Stack>
        </>
    )
}

export default Edit
