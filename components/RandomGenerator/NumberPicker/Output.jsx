import { Box, IconButton } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const Output = ({ number, isLottery }) => {
    return (
        <Box
            sx={{
                position: 'relative',
                padding: 2,
                backgroundColor: isLottery ? 'red' : 'background.secondary',
                borderRadius: 2,
                cursor: 'pointer',
                '& button': {
                    display: 'none',
                },
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                '&:hover .number': {
                    opacity: 0,
                    visibility: 'hidden',
                },
                '&:hover button': {
                    display: 'block',
                },
            }}
            onClick={() => navigator.clipboard.writeText(number)}>
            <div className='number'>{number}</div>

            <IconButton
                size='small'
                aria-label='copy value to clipboard'
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                }}>
                <ContentCopyIcon />
            </IconButton>
        </Box>
    )
}

export default Output
