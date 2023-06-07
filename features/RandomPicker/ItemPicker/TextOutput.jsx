import { Box } from '@mui/material'

import OutputMessage from '../../../components/common/OutputMessage'

const TextOutput = ({ resultRef, values }) => {
    return (
        <Box sx={{ marginTop: { sm: 6, md: 8 } }}>
            {values?.output?.length > 0 ? (
                <div ref={resultRef}>
                    {values.output.map((item, i) => (
                        <div key={i}>{item}</div>
                    ))}
                </div>
            ) : (
                <OutputMessage message='No items to show.' />
            )}
        </Box>
    )
}

export default TextOutput
