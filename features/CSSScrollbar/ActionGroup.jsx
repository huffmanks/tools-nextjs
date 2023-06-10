import { Button, Stack } from '@mui/material'
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
        <Stack direction='row' justifyContent='end' margin='0 0 20px auto' gap={2}>
            <Button variant='contained' aria-label='copy' size='large' onClick={handleCopy} endIcon={<ContentCopyIcon fontSize='inherit' />}>
                Copy
            </Button>
        </Stack>
    )
}

export default ActionGroup
