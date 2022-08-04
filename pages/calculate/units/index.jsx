import { useUnitCalculatorFormControls } from '../../../helpers/UnitCalculator/useUnitCalculatorFormControls'

import { Typography } from '@mui/material'

import SEO from '../../../components/common/SEO'
import PageTitle from '../../../components/common/PageTitle'

import LoadingSkeleton from '../../../features/UnitCalculator/LoadingSkeleton'
import UnitInputs from '../../../features/UnitCalculator/UnitInputs'
import UnitOutput from '../../../features/UnitCalculator/UnitOutput'

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
