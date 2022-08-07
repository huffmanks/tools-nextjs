import { useRef } from 'react'

import { Box } from '@mui/material'

import GlobalModal from '../../components/common/GlobalModal'
import ListToolbar from './ListToolbar'

const ListModal = ({ list, handleFavorite, handleDelete }) => {
    const listRef = useRef()

    return (
        <GlobalModal title={list?.title} description='list of items modal'>
            <Box ref={listRef} sx={{ maxHeight: 250, p: 3, overflowY: 'auto' }}>
                {list?.items.map((item) => (
                    <div key={item.id}>{item.text}</div>
                ))}
            </Box>

            <ListToolbar listRef={listRef} list={list} handleFavorite={handleFavorite} handleDelete={handleDelete} />
        </GlobalModal>
    )
}

export default ListModal
