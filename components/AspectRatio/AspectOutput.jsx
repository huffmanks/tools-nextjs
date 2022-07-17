import { Grid, Chip } from '@mui/material'

import AspectValues from './AspectValues'
import PreviewBox from './PreviewBox'

const AspectOutput = ({ values }) => {
    return (
        <Grid item container spacing={2} md={6}>
            <Grid item xs={12}>
                <Chip label='Output' color='primary' component='div' sx={{ marginBottom: '2rem' }} />
            </Grid>

            <AspectValues values={values} />

            <PreviewBox values={values} />
        </Grid>
    )
}

export default AspectOutput
