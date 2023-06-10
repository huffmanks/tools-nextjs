import { Button } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { useGlobalState } from '../../hooks/useContext'
import { generateScrollbarStrings } from '../../utilities/generateScrollbarStrings'

const CopyButton = ({ values, colors }) => {
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
        <div style={{ width: 'fit-content', margin: values.axis === 'y' ? '0 0 20px auto' : '0 0 20px 0' }}>
            <Button variant='contained' aria-label='copy' size='large' onClick={handleCopy} endIcon={<ContentCopyIcon fontSize='inherit' />}>
                Copy
            </Button>
        </div>
    )
}

export default CopyButton
