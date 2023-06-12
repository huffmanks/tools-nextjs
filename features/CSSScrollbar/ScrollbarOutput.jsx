import { Box, Grid } from '@mui/material'

import ActionGroup from './ActionGroup'
import CodeBlock from './CodeBlock'

const ScrollbarOutput = ({ values, colors }) => {
    return (
        <>
            <Grid item xs={12} md={7}>
                <Box sx={{ position: 'relative' }}>
                    <ActionGroup values={values} colors={colors} />

                    <CodeBlock values={values} colors={colors} />
                </Box>
            </Grid>
        </>
    )
}

export default ScrollbarOutput
