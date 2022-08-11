import { Box } from '@mui/material'

const OutputMessage = ({ message, extraMb }) => {
    return <Box sx={{ width: 'fit-content', marginBottom: extraMb ? 6 : 0, padding: '8px 12px', backgroundColor: 'background.altTwo', borderRadius: 1 }}>{message}</Box>
}

export default OutputMessage
