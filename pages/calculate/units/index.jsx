import { useUnitCalculatorFormControls } from '../../../hooks/useUnitCalculatorFormControls'

import { Typography } from '@mui/material'

import SEO from '../../../components/layout/SEO'
import PageTitle from '../../../components/layout/PageTitle'
import LoadingSkeleton from '../../../components/UnitCalculator/LoadingSkeleton'
import UnitInputs from '../../../components/UnitCalculator/UnitInputs'
import UnitOutput from '../../../components/UnitCalculator/UnitOutput'

const UnitCalculator = () => {
    const { isLoading, values, currentUnits, handleChange, handleFocus } = useUnitCalculatorFormControls()

    return (
        <>
            <SEO description='Calculate different unit types.' title='Unit Calculator' url='/calculate/units' imageUrl='/unit-calculator.png' />
            <PageTitle>Unit Calculator</PageTitle>

            <Typography paragraph mb={5}>
                Calculate different unit types.
            </Typography>

            {!isLoading ? (
                <>
                    <UnitInputs values={values} currentUnits={currentUnits} handleChange={handleChange} handleFocus={handleFocus} />

                    <UnitOutput values={values} currentUnits={currentUnits} />
                </>
            ) : (
                <LoadingSkeleton />
            )}
        </>
    )
}

export default UnitCalculator
