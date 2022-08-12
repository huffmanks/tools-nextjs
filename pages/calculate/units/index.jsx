import { useUnitCalculatorFormControls } from '../../../features/UnitCalculator/useUnitCalculatorFormControls'

import { Typography } from '@mui/material'

import SEO from '../../../components/common/SEO'
import PageTitle from '../../../components/common/PageTitle'

import UnitInputs from '../../../features/UnitCalculator/UnitInputs'
import UnitOutput from '../../../features/UnitCalculator/UnitOutput'
import InputContainer from '../../../features/UnitCalculator/InputContainer'
import Skelly from '../../../components/common/Skelly'
import SkellyGroup from '../../../components/common/SkellyGroup'

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
                <>
                    <InputContainer top={<Skelly type='input' />} center={<Skelly type='input' />} bottom={<Skelly type='input' />} />

                    <SkellyGroup type='input' skellyAmount={3} gapSize={4} />
                </>
            )}
        </>
    )
}

export default UnitCalculator
