import { useTodoListFormControls } from '../../hooks/useTodoListFormControls'

import { IconButton, Stack, Divider } from '@mui/material'

import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const ListToolbar = ({ list, handleCopy }) => {
    const { handleDelete } = useTodoListFormControls()
    return (
        <>
            <Divider />
            <Stack direction='row' gap={1} p={1}>
                <IconButton value='favorite' aria-label='favorite'>
                    {list.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <IconButton aria-label='copy' onClick={handleCopy}>
                    <ContentCopyIcon />
                </IconButton>
                <IconButton value='edit' aria-label='edit'>
                    <EditIcon />
                </IconButton>
                <IconButton value='delete' aria-label='delete' onClick={() => handleDelete(list)} sx={{ ml: 'auto' }}>
                    <DeleteIcon />
                </IconButton>
            </Stack>
        </>
    )
}

export default ListToolbar
