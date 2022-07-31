import { useState } from 'react'

import { Backdrop, Box, Button, Fade, Modal } from '@mui/material'

import ListToolbar from './ListToolbar'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const ListModal = ({ list, index, listRefs, handleCopy, handleUpdate }) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    return (
        <>
            <Button variant='contained' onClick={handleOpen}>
                {list.title}
            </Button>
            <Modal
                aria-labelledby={`transition-modal-${list.title}`}
                aria-describedby={`transition-modal-${list.items[0].text}`}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={open}>
                    <Box sx={style}>
                        <>
                            <ListToolbar list={list} handleCopy={() => handleCopy(listRefs.current[index])} handleUpdate={handleUpdate} />

                            <Box ref={listRefs.current[index]} sx={{ p: 3 }}>
                                {list.items.map((item) => (
                                    <div key={item.id}>{item.text}</div>
                                ))}
                            </Box>
                        </>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default ListModal
