import { Grid } from '@mui/material'

import CopyButton from './CopyButton'
import Demo from './Demo'
import CodeBlock from './CodeBlock'

const ScrollbarOutput = ({ values, colors }) => {
    return (
        <>
            <Grid item xs={12} md={6}>
                <CopyButton values={values} colors={colors} />
                <Demo values={values} colors={colors}>
                    <CodeBlock values={values} colors={colors} />
                </Demo>
            </Grid>
        </>
    )
}

export default ScrollbarOutput
