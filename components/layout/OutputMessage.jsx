import { Box } from '@mui/material'

const OutputMessage = ({ message }) => {
    return <Box sx={{ width: 'fit-content', backgroundColor: 'background.secondary', padding: '8px 12px', borderRadius: 1 }}>{message}</Box>
}

export default OutputMessage
