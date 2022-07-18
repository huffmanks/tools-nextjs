import { useTextFormatterForm } from '../../hooks/useTextFormatterForm'

import { Grid } from '@mui/material'

import SEO from '../../components/layout/SEO'
import PageTitle from '../../components/layout/PageTitle'
import Textarea from '../../components/TextFormatter/Textarea'
import ActionGroup from '../../components/TextFormatter/ActionGroup'
import Cards from '../../components/TextFormatter/Cards'

const TextFormatter = () => {
    const { values, saved, checkedCards, checkAll, handleChange, handleSave, handleCheckAll, handleCopy, handleClear, handleReset } = useTextFormatterForm()

    return (
        <>
            <SEO description='Format text to any case.' title='Text Formatter' url='/text-formatter' imageUrl='/text-formatter.png' />
            <PageTitle>Text Formatter</PageTitle>

            <Grid container spacing={5}>
                <Textarea values={values} handleChange={handleChange} handleClear={handleClear} />
                <ActionGroup values={values} saved={saved} checkAll={checkAll} handleChange={handleChange} handleCheckAll={handleCheckAll} handleReset={handleReset} handleSave={handleSave} />
                <Cards values={values} checkedCards={checkedCards} handleCopy={handleCopy} />
            </Grid>
        </>
    )
}

export default TextFormatter
