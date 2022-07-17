import { useUnitQuery } from '../../hooks/useUnitQuery'
import { useUnitForm } from '../../hooks/useUnitForm'

import { Box } from '@mui/material'

import SEO from '../../components/layout/SEO'
import PageTitle from '../../components/layout/PageTitle'
import UnitInputs from '../../components/UnitConverter/UnitInputs'
import UnitOutput from '../../components/UnitConverter/UnitOutput'

const UnitConverter = () => {
    const { values, setValues, currentUnits, setCurrentUnits } = useUnitQuery()

    const { handleChange, handleFocus, handleClear } = useUnitForm(values, setValues, setCurrentUnits)

    return (
        <>
            <SEO description='Convert different unit types.' title='Convert Units' url='/unit-converter' />
            <PageTitle>Convert Units</PageTitle>

            <Box
                sx={{
                    display: 'flex',
                    gap: 5,
                    '@media (max-width: 899px)': {
                        display: 'block',
                    },
                }}>
                <Box sx={{ flex: '0 0 50%' }}>
                    <UnitInputs values={values} currentUnits={currentUnits} handleChange={handleChange} handleFocus={handleFocus} handleClear={handleClear} />
                </Box>

                <UnitOutput values={values} currentUnits={currentUnits} />
            </Box>
        </>
    )
}

export default UnitConverter
