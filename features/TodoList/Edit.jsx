import { useTodoListFormControls } from './useTodoListFormControls'

import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'

const Edit = () => {
    const { list, errors, formIsValid, handleChange, handleAddInput, handleRemoveItem, handleSubmit } = useTodoListFormControls()

    return (
        <>
            {list?.id && (
                <>
                    <Typography component='div' variant='h5' sx={{ textTransform: 'uppercase' }}>
                        {list.title}
                    </Typography>

                    <Typography component='div' variant='subtitle2'>{`Created at: ${list.createdAt.date} ${list.createdAt.time}`}</Typography>
                    <Typography component='div' variant='subtitle2' mb={5}>{`Last updated: ${list.updatedAt.date} ${list.updatedAt.time}`}</Typography>
                </>
            )}
            <Stack direction='column' gap={3}>
                <TextField
                    required
                    variant='outlined'
                    label='List Title'
                    placeholder={list.title}
                    name='title'
                    value={list.title}
                    onChange={handleChange}
                    autoComplete='none'
                    error={errors.title}
                    helperText=''
                    {...(errors.title && {
                        error: true,
                        helperText: 'Title field is required.',
                    })}
                />

                <Stack direction='column' gap={3}>
                    {list?.items?.map((item, index) => (
                        <TextField
                            key={item.id}
                            id={item.id}
                            variant='outlined'
                            placeholder={`Item ${index + 1}`}
                            defaultValue={item.text}
                            value={item[item.id]}
                            onChange={handleChange}
                            autoComplete='none'
                            helperText=''
                            {...(!list.items[0].text.length &&
                                !list.items[1] && {
                                    error: true,
                                    helperText: 'One item is required.',
                                })}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            disabled={!list.items[1]}
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
                    <Button variant='outlined' size='large' disabled={!formIsValid} aria-label='add extra item input' onClick={handleAddInput} endIcon={<AddIcon />} sx={{ height: 56, marginTop: 1 }}>
                        Add
                    </Button>
                </Box>

                <Box>
                    <Button variant='contained' size='large' disabled={!formIsValid} aria-label='create todo list' onClick={handleSubmit} endIcon={<SaveIcon />} sx={{ marginTop: 4 }}>
                        Save
                    </Button>
                </Box>
            </Stack>
        </>
    )
}

export default Edit
