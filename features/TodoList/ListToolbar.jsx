import { useGlobalState, useLists } from '../../hooks/useContext'

import { IconButton, Stack, Divider } from '@mui/material'

import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const ListToolbar = ({ listRef, listId }) => {
    const { removeModal } = useGlobalState()
    const { changeScreen, lists, addListAsFavorite, copyList, removeList } = useLists()

    const isFavorite = lists.some((list) => list.id === listId && list.isFavorite)

    const handleEdit = (e) => {
        changeScreen(e, 'edit')
        removeModal()
    }

    return (
        <>
            <Divider />
            <Stack direction='row' gap={1} p={1}>
                <IconButton value='favorite' aria-label='favorite' onClick={() => addListAsFavorite(listId)}>
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <IconButton aria-label='copy' onClick={() => copyList(listRef)}>
                    <ContentCopyIcon />
                </IconButton>
                <IconButton disabled value='edit' aria-label='edit' onClick={handleEdit}>
                    <EditIcon />
                </IconButton>
                <IconButton value='delete' aria-label='delete' onClick={() => removeList(listId)} sx={{ ml: 'auto' }}>
                    <DeleteIcon />
                </IconButton>
            </Stack>
        </>
    )
}

export default ListToolbar
