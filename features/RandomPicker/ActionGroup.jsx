import { Button, Stack } from '@mui/material'
import NumbersIcon from '@mui/icons-material/Numbers'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

const ActionGroup = ({ isCopyDisabled, isGenerateDisabled, isUpload, generateAria, handleRandomSelection, handleClick, handleCopy, handleReset }) => {
    const styles = {
        button: {
            width: {
                xs: '100%',
                xms: 'fit-content',
            },
            '@media (min-width: 415px) and (max-width: 450px)': {
                '& svg': {
                    display: 'none',
                },
            },
            '@media (min-width: 900px) and (max-width: 1050px)': {
                '& svg': {
                    display: 'none',
                },
            },
        },
    }
    return (
        <Stack direction={{ xs: 'column', xms: 'row' }} gap={2} mt={{ sm: !isUpload ? 3 : 0, md: !isUpload ? 6.5 : 0 }} mb={3}>
            <Button
                variant='contained'
                size='large'
                disabled={isGenerateDisabled}
                aria-label={generateAria}
                endIcon={<NumbersIcon />}
                onClick={isUpload ? handleRandomSelection : handleClick}
                sx={styles.button}>
                Generate
            </Button>
            {!isUpload && (
                <Button variant='contained' size='large' disabled={isCopyDisabled} aria-label='copy value to clipboard' endIcon={<ContentCopyIcon />} onClick={handleCopy} sx={styles.button}>
                    Copy
                </Button>
            )}
            <Button variant='contained' size='large' aria-label='reset values' endIcon={<RestartAltIcon />} onClick={handleReset} sx={styles.button}>
                Reset
            </Button>
        </Stack>
    )
}

export default ActionGroup
