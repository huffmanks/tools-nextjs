import { useUnitFormControls } from '../../hooks/useUnitFormControls'

import SEO from '../../components/layout/SEO'
import PageTitle from '../../components/layout/PageTitle'
import LoadingSkeleton from '../../components/UnitConverter/LoadingSkeleton'
import UnitInputs from '../../components/UnitConverter/UnitInputs'
import UnitOutput from '../../components/UnitConverter/UnitOutput'

const UnitConverter = () => {
    const { isLoading, values, currentUnits, handleChange, handleFocus } = useUnitFormControls()

    return (
        <>
            <SEO description='Convert different unit types.' title='Unit Converter' url='/unit-converter' imageUrl='/unit-converter.png' />
            <PageTitle>Unit Converter</PageTitle>

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

export default UnitConverter
