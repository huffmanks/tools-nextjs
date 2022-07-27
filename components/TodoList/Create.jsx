import { Box, Grid, Button, IconButton, InputAdornment, TextField, Stack, Typography } from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import DesignServicesIcon from '@mui/icons-material/DesignServices'

const Create = ({ values, errors, items, handleChange, handleAddItem, handleSubmit, formIsValid }) => {
    return (
        <>
            <Typography paragraph mb={5}>
                Create a todo list.
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        required
                        fullWidth
                        variant='outlined'
                        label='List Title'
                        placeholder='Shopping List'
                        name='title'
                        value={values.title}
                        onChange={handleChange}
                        autoComplete='none'
                        error={errors.title}
                        helperText='Enter a title for the list.'
                        {...(errors.title && {
                            error: true,
                            helperText: 'This field is required.',
                        })}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Add Item'
                        placeholder='Carrots'
                        name='item'
                        value={values.item}
                        onChange={handleChange}
                        onKeyPress={handleAddItem}
                        autoComplete='none'
                        error={errors.item}
                        helperText={items?.length ? 'Add another item.' : 'Enter at least one item to the list.'}
                        {...(errors.item && {
                            error: true,
                            helperText: 'One item is required.',
                        })}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        id='addItemButton'
                                        variant='contained'
                                        edge='start'
                                        aria-label='add item'
                                        onClick={(e) => handleAddItem(e)}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'primary.main',
                                            },
                                        }}>
                                        <AddIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Stack direction={{ xs: 'column', md: 'row' }} flexWrap='wrap' sx={{ maxWidth: { md: 'calc(66.666666% - 10px)' }, gap: 2 }}>
                        {items.length ? (
                            items.map((item) => (
                                <Box key={item.id} sx={{ backgroundColor: 'background.secondary', padding: '8px 12px', borderRadius: 1 }}>
                                    {item.text}
                                </Box>
                            ))
                        ) : (
                            <Box sx={{ backgroundColor: 'background.secondary', padding: '8px 12px', borderRadius: 1 }}>Added items will appear here.</Box>
                        )}
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                    <Button
                        fullWidth
                        variant='contained'
                        size='large'
                        disabled={!formIsValid}
                        aria-label='create todo list'
                        onClick={handleSubmit}
                        endIcon={<DesignServicesIcon />}
                        sx={{ marginTop: 2 }}>
                        Create
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default Create
