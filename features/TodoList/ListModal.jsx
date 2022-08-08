import { useRef } from 'react'

import { useGlobalState } from '../../hooks/useContext'

import { Box } from '@mui/material'

import GlobalModal from '../../components/common/GlobalModal'
import ListToolbar from './ListToolbar'

const ListModal = ({ list }) => {
    const listRef = useRef()

    const { modalId } = useGlobalState()

    return (
        <>
            {modalId && (
                <GlobalModal title={list.title} description='list of items modal'>
                    <Box ref={listRef} sx={{ maxHeight: 250, p: 3, overflowY: 'auto' }}>
                        {list.items.map((item) => (
                            <div key={item.id}>{item.text}</div>
                        ))}
                    </Box>

                    <ListToolbar listRef={listRef} listId={list.id} />
                </GlobalModal>
            )}
        </>
    )
}

export default ListModal
