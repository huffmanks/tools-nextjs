import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import oneDark from 'react-syntax-highlighter/dist/cjs/styles/prism/one-dark'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'

import { Box, IconButton } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

import { useGlobalState } from '../../hooks/useContext'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { generateScrollbarStrings } from '../../utilities/generateScrollbarStrings'

SyntaxHighlighter.registerLanguage('css', css)

const CodeBlock = ({ value }) => {
    const { addToast } = useGlobalState()
    const [copy] = useCopyToClipboard(false)

    const { codeString } = generateScrollbarStrings(value)

    const handleCopy = async () => {
        const copySuccess = await copy(codeString)

        if (copySuccess) {
            addToast('Copied to clipboard!')
        }
    }
    return (
        <Box sx={{ position: 'relative', width: 600, fontSize: 14 }}>
            <SyntaxHighlighter language='css' style={oneDark} wrapLines='true' showLineNumbers='true'>
                {codeString}
            </SyntaxHighlighter>
            <IconButton aria-label='copy' size='large' onClick={handleCopy} sx={{ position: 'absolute', top: 15, right: 8 }}>
                <ContentCopyIcon fontSize='inherit' />
            </IconButton>
        </Box>
    )
}

export default CodeBlock
