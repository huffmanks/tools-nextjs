import { useGlobalState } from '../../hooks/useContext'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'

import { Box } from '@mui/material'

const ColorItem = ({ colorValue, textColor }) => {
    const { addToast } = useGlobalState()
    const [copy] = useCopyToClipboard()

    const handleCopy = async () => {
        const copySuccess = await copy(colorValue)

        if (copySuccess) {
            addToast('Copied to clipboard!')
        }
    }

    return (
        <Box
            sx={{
                padding: '1rem 0.5rem',
                backgroundColor: 'background.altTwo',
                textAlign: 'center',
                borderLeftWidth: '65px',
                borderLeftStyle: 'solid',
                borderColor: colorValue,
                cursor: 'pointer',
                transition: '0.15s ease-in',
                '&:nth-of-type(even)': {
                    backgroundColor: 'background.altFour',
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
            onClick={handleCopy}>
            {colorValue}
        </Box>
    )
}

export default ColorItem
