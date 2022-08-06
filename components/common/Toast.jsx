import { forwardRef } from 'react'

import { useGlobalState } from '../../hooks/useGlobalState'

import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const Toast = () => {
    const { toastOpen, toastMessage, removeToast } = useGlobalState()

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') {
            return
        }

        removeToast()
    }

    return (
        <>
            <Snackbar
                open={toastOpen}
                autoHideDuration={3000}
                onClose={handleClose}
                sx={{
                    top: { xs: 88, sm: 'auto' },
                    bottom: { xs: 'auto', sm: 24 },
                }}>
                <Alert severity='success' onClose={handleClose} sx={{ width: '100%', backgroundColor: 'primary.main', backgroundImage: 'none' }}>
                    {toastMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Toast
