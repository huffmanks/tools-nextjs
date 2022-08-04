import { forwardRef } from 'react'

import { useGlobalState } from '../../hooks/useGlobalState'

import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' color='primary' {...props} />
})

const Toast = () => {
    const { message, open, removeToast } = useGlobalState()

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') {
            return
        }

        removeToast()
    }

    return (
        <>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Toast
