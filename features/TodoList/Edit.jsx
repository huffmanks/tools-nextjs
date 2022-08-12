import { useRef } from 'react'

import { useLists } from '../../hooks/useContext'
import { useTodoListFormControls } from './useTodoListFormControls'

import { Box, Button, Checkbox, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'

import ListType from './ListType'

const Edit = () => {
    const itemsRef = useRef()
    const { handleFocus, handleBlur } = useLists()
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

            <ListType list={list} handleChange={handleChange} />

            <div>
                <TextField
                    required
                    variant='outlined'
                    label='List Title'
                    placeholder={list.title}
                    name='title'
                    value={list.title}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    autoComplete='none'
                    error={errors.title}
                    sx={{ width: 'min(300px, 100%)' }}
                    helperText=''
                    {...(errors.title && {
                        error: true,
                        helperText: 'Title field is required.',
                    })}
                />
            </div>

            <Stack ref={itemsRef} direction='column' gap={3} mt={3}>
                {list?.items?.map((item, index) => (
                    <TextField
                        key={item.id}
                        id={item.id}
                        // disabled={item.completed}
                        fullWidth
                        variant='outlined'
                        placeholder={`Item ${index + 1}`}
                        defaultValue={item.text}
                        value={item[item.id]}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onKeyDown={(e) => handleAddInput(e, index, itemsRef)}
                        autoComplete='none'
                        sx={{ width: 'min(300px, 100%)' }}
                        helperText=''
                        {...(!list.items[0].text.length &&
                            !list.items[1] && {
                                error: true,
                                helperText: 'One item is required.',
                            })}
                        InputProps={{
                            // startAdornment: (
                            //     <InputAdornment position='start' sx={{ '& span': { paddingLeft: 0 } }}>
                            //         <Checkbox checked={item.completed} onChange={handleChange} inputProps={{ 'aria-label': 'item completed checkbox' }} />
                            //     </InputAdornment>
                            // ),
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
                <Button
                    id='addInput'
                    variant='outlined'
                    size='large'
                    aria-label='add extra item input'
                    onClick={handleAddInput}
                    endIcon={<AddIcon />}
                    sx={{ width: 'min(300px, 100%)', height: 55, marginTop: 3 }}>
                    Add
                </Button>
            </Box>

            <Box>
                <Button
                    variant='contained'
                    size='large'
                    disabled={!formIsValid}
                    aria-label='create todo list'
                    onClick={handleSubmit}
                    endIcon={<SaveIcon />}
                    sx={{ width: { xs: '100%', sm: 150 }, marginTop: 5 }}>
                    Save
                </Button>
            </Box>
        </>
    )
}

export default Edit
