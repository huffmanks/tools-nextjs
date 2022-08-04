import { Grid, Chip } from '@mui/material'

import AspectInputs from './AspectInputs'

const AspectForm = ({ values, errors, handleFocus, handleChange, handleBlur }) => {
    return (
        <Grid item container spacing={2} md={6} component='form'>
            <Grid item xs={12}>
                <Chip label='Original' color='primary' component='div' sx={{ marginBottom: '2rem' }} />
            </Grid>

            <AspectInputs values={values} errors={errors} handleFocus={handleFocus} handleChange={handleChange} handleBlur={handleBlur} />
        </Grid>
    )
}

export default AspectForm
