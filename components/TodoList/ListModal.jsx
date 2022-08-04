import { useTodoListFormControls } from '../../hooks/useTodoListFormControls'

import { Backdrop, Box, Button, Fade, IconButton, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import ListToolbar from './ListToolbar'

const ListModal = ({ list, index, listRefs, handleCopy }) => {
    const { listModal, handleOpenModal, handleCloseModal } = useTodoListFormControls()

    return (
        <>
            <Button fullWidth variant='contained' onClick={handleOpenModal} endIcon={<MoreVertIcon fontSize='medium' />} sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 20 }}>
                {list.title}
            </Button>

            <Modal
                aria-labelledby={`transition-modal-${list.title}`}
                aria-describedby={`transition-modal-${list.title}`}
                open={listModal}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={listModal}>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 325, bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, p: 2, bgcolor: 'primary.main' }}>
                            <Typography fontSize={24} lineHeight={1.15}>
                                {list.title}
                            </Typography>
                            <IconButton aria-label='close modal' onClick={handleCloseModal} sx={{ p: 0 }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        <Box ref={listRefs.current[index]} sx={{ p: 3 }}>
                            {list.items.map((item) => (
                                <div key={item.id}>{item.text}</div>
                            ))}
                        </Box>

                        <ListToolbar list={list} handleCopy={() => handleCopy(listRefs.current[index])} />
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default ListModal
