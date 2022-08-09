import { useTodoListFormControls } from './useTodoListFormControls'

import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'

const Edit = () => {
    const { list, errors, formIsValid, handleChange, handleAddInput, handleRemoveItem, handleSubmit } = useTodoListFormControls()

    return (
        <>
            <Typography paragraph mb={5}>
                {`List: ${list?.title} | ID: ${list?.id}`}
            </Typography>
            <Stack gap={3}>
                <TextField
                    required
                    fullWidth
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

                <Stack direction={{ xs: 'column', md: 'column' }} gap={3}>
                    {list?.items?.map((item, index) => (
                        <TextField
                            key={index}
                            id={item.id}
                            fullWidth
                            variant='outlined'
                            placeholder={`Item ${index + 1}`}
                            defaultValue={item.text}
                            value={item[item.id]}
                            onChange={handleChange}
                            autoComplete='none'
                            error={errors[item.id]}
                            helperText=''
                            {...(errors[item.id] && {
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
                    <Button fullWidth variant='outlined' size='large' disabled={!formIsValid} aria-label='add extra item input' onClick={handleAddInput} endIcon={<AddIcon />} sx={{ marginTop: 1 }}>
                        Add
                    </Button>
                </Box>

                <Box>
                    <Button fullWidth variant='contained' size='large' disabled={!formIsValid} aria-label='create todo list' onClick={handleSubmit} endIcon={<SaveIcon />} sx={{ marginTop: 4 }}>
                        Save
                    </Button>
                </Box>
            </Stack>
        </>
    )
}

export default Edit
