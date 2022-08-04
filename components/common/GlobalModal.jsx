import { Backdrop, Box, Fade, IconButton, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { useGlobalState } from '../../hooks/useGlobalState'

const GlobalModal = ({ title, description, children }) => {
    const { modalOpen, removeModal } = useGlobalState()

    return (
        <>
            <Modal
                aria-labelledby={`transition-modal-${title}`}
                aria-describedby={`transition-modal-${description}`}
                open={modalOpen}
                onClose={removeModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={modalOpen}>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 325, bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, p: 2, bgcolor: 'primary.main' }}>
                            <Typography fontSize={24} lineHeight={1.15}>
                                {title}
                            </Typography>

                            <IconButton aria-label='close modal' onClick={removeModal} sx={{ p: 0 }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        {children}
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default GlobalModal
