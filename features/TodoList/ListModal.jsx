import { useRef } from 'react'

import { useGlobalState } from '../../hooks/useGlobalState'

import { Box } from '@mui/material'

import GlobalModal from '../../components/common/GlobalModal'
import ListToolbar from './ListToolbar'

const ListModal = ({ handleCopy, handleFavorite, handleDelete }) => {
    const listRef = useRef()
    const { modalData } = useGlobalState()

    return (
        <GlobalModal title={modalData?.title ?? 'modal title'} description='list of items modal'>
            <Box ref={listRef} sx={{ p: 3 }}>
                {modalData?.items && modalData.items.map((item) => <div key={item.id}>{item.text}</div>)}
            </Box>

            <ListToolbar handleCopy={() => handleCopy(listRef)} handleFavorite={handleFavorite} handleDelete={handleDelete} />
        </GlobalModal>
    )
}

export default ListModal
