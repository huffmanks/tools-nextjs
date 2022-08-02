import { Button, Stack } from '@mui/material'
import NumbersIcon from '@mui/icons-material/Numbers'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const ActionGroup = ({ isDisabled, generateAria, handleClick, handleCopy }) => {
    return (
        <Stack
            direction={{ xs: 'row', sm: 'row' }}
            gap={2}
            sx={{
                flexDirection: {
                    xs: 'column',
                    xms: 'row',
                },
                marginTop: '32px',
            }}>
            <Button variant='contained' size='large' aria-label={generateAria} endIcon={<NumbersIcon />} onClick={handleClick}>
                Generate
            </Button>
            <Button variant='contained' size='large' disabled={isDisabled} aria-label='copy value to clipboard' endIcon={<ContentCopyIcon />} onClick={handleCopy}>
                Copy
            </Button>
        </Stack>
    )
}

export default ActionGroup
