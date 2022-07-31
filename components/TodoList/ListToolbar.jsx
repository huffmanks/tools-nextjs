import { ButtonGroup, IconButton } from '@mui/material'

import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const ListToolbar = ({ list, handleCopy, handleUpdate }) => {
    return (
        <>
            <ButtonGroup variant='outlined' aria-label='list toolbar' sx={{ mb: 4, padding: '4px 8px', backgroundColor: 'background.secondary' }}>
                <IconButton value='favorite' aria-label='favorite' onClick={() => handleUpdate(list, 'favorite')}>
                    {list.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <IconButton aria-label='copy' onClick={handleCopy}>
                    <ContentCopyIcon />
                </IconButton>
                <IconButton value='edit' aria-label='edit'>
                    <EditIcon />
                </IconButton>
                <IconButton value='delete' aria-label='delete'>
                    <DeleteIcon />
                </IconButton>
            </ButtonGroup>
        </>
    )
}

export default ListToolbar
