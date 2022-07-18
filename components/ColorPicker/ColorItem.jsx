import { Box } from '@mui/material'

const ColorItem = ({ colorValue, textColor }) => {
    const handleClipboard = () => {
        return navigator.clipboard.writeText(colorValue)
    }

    return (
        <Box
            sx={{
                padding: '1rem 0.5rem',
                backgroundColor: 'background.secondary',
                textAlign: 'center',
                borderLeftWidth: '65px',
                borderLeftStyle: 'solid',
                borderColor: colorValue,
                cursor: 'pointer',
                transition: '0.15s ease-in',
                '&:nth-of-type(even)': {
                    backgroundColor: 'background.altSecondary',
                },
                '&:hover': {
                    backgroundColor: colorValue,
                    color: textColor,
                },
                '@media (max-width: 652px)': {
                    borderLeftWidth: '115px',
                },
                '@media (max-width: 450px)': {
                    borderLeftWidth: '65px',
                },
                '@media (max-width: 350px)': {
                    borderLeftWidth: '40px',
                    fontSize: '14px',
                },
            }}
            onClick={handleClipboard}>
            {colorValue}
        </Box>
    )
}

export default ColorItem
