import { useTextFormatterFormControls } from '../../../helpers/TextFormatter/useTextFormatterFormControls'

import { Grid, Typography } from '@mui/material'

import SEO from '../../../components/common/SEO'
import PageTitle from '../../../components/common/PageTitle'

import Textarea from '../../../features/TextFormatter/Textarea'
import ActionGroup from '../../../features/TextFormatter/ActionGroup'
import Cards from '../../../features/TextFormatter/Cards'

const TextFormatter = () => {
    const { values, saved, checkedCards, checkAll, handleChange, handleSave, handleCheckAll, handleCopy, handleClear, handleReset } = useTextFormatterFormControls()

    return (
        <>
            <SEO description='Format text to any case.' title='Text Formatter' url='/format/text' imageUrl='/text-formatter.png' />

            <PageTitle>Text Formatter</PageTitle>

            <Typography paragraph mb={5}>
                Format text to any case.
            </Typography>

            <Grid container spacing={5}>
                <Textarea output={values.output} handleChange={handleChange} handleClear={handleClear} />

                <ActionGroup values={values} saved={saved} checkAll={checkAll} handleChange={handleChange} handleCheckAll={handleCheckAll} handleReset={handleReset} handleSave={handleSave} />

                <Cards values={values} checkedCards={checkedCards} handleCopy={handleCopy} />
            </Grid>
        </>
    )
}

export default TextFormatter
