import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import oneDark from 'react-syntax-highlighter/dist/cjs/styles/prism/one-dark'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'

import { Box } from '@mui/material'

import { generateScrollbarStrings } from '../../utilities/generateScrollbarStrings'

SyntaxHighlighter.registerLanguage('css', css)

const CodeBlock = ({ values, colors }) => {
    const { codeString } = generateScrollbarStrings(values, colors)
    return (
        <Box sx={{ fontSize: 14 }}>
            <SyntaxHighlighter language='css' customStyle={{ margin: 0, padding: '20px 10px', overflow: 'initial' }} style={oneDark} wrapLines='true' showLineNumbers='true'>
                {codeString}
            </SyntaxHighlighter>
        </Box>
    )
}

export default CodeBlock
