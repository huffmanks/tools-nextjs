import { Button, Stack } from '@mui/material'
import NumbersIcon from '@mui/icons-material/Numbers'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

const ActionGroup = ({ isDisabled, generateAria, handleClick, handleCopy, handleReset }) => {
    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} mb={3}>
            <Button variant='contained' size='large' aria-label={generateAria} endIcon={<NumbersIcon />} onClick={handleClick}>
                Generate
            </Button>
            <Button variant='contained' size='large' disabled={isDisabled} aria-label='copy value to clipboard' endIcon={<ContentCopyIcon />} onClick={handleCopy}>
                Copy
            </Button>
            <Button variant='contained' size='large' aria-label='reset values' endIcon={<RestartAltIcon />} onClick={handleReset}>
                Reset
            </Button>
        </Stack>
    )
}

export default ActionGroup
