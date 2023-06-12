import { Button, Box } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { useGlobalState } from '../../hooks/useContext'
import { generateScrollbarStrings } from '../../utilities/generateScrollbarStrings'

const ActionGroup = ({ values, colors }) => {
    const { addToast } = useGlobalState()
    const [copy] = useCopyToClipboard(false)

    const { codeString } = generateScrollbarStrings(values, colors)

    const handleCopy = async () => {
        const copySuccess = await copy(codeString)

        if (copySuccess) {
            addToast('Copied to clipboard!')
        }
    }

    return (
        <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
            <Button variant='contained' aria-label='copy' size='large' onClick={handleCopy} endIcon={<ContentCopyIcon fontSize='inherit' />}>
                Copy
            </Button>
        </Box>
    )
}

export default ActionGroup
