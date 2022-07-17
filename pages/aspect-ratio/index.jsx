import { useFormControls } from '../../hooks/useFormControls'
import { initialValues } from '../../constants/aspectRatio'

import { Grid } from '@mui/material'

import SEO from '../../components/layout/SEO'
import PageTitle from '../../components/layout/PageTitle'
import AspectForm from '../../components/AspectRatio/AspectForm'
import AspectOutput from '../../components/AspectRatio/AspectOutput'

const AspectRatio = () => {
    const { values, errors, handleFocus, handleChange, handleBlur } = useFormControls(initialValues)

    return (
        <>
            <SEO description='Calculate the aspect ratio.' title='Aspect Ratio Calculator' url='/aspect-ratio' />
            <PageTitle>Aspect Ratio Calculator</PageTitle>

            <Grid container spacing={5} alignItems='start'>
                <AspectForm values={values} errors={errors} handleFocus={handleFocus} handleChange={handleChange} handleBlur={handleBlur} />

                <AspectOutput values={values} />
            </Grid>
        </>
    )
}

export default AspectRatio
