import { useUnitFormControls } from '../../hooks/useUnitFormControls'

import SEO from '../../components/layout/SEO'
import PageTitle from '../../components/layout/PageTitle'
import LoadingSkeleton from '../../components/UnitConverter/LoadingSkeleton'
import UnitInputs from '../../components/UnitConverter/UnitInputs'
import UnitOutput from '../../components/UnitConverter/UnitOutput'

const UnitConverter = () => {
    const { loading, values, currentUnits, handleChange, handleFocus } = useUnitFormControls()

    return (
        <>
            <SEO description='Convert different unit types.' title='Convert Units' url='/unit-converter' imageUrl='/unit-converter.png' />
            <PageTitle>Convert Units</PageTitle>

            {loading ? (
                <LoadingSkeleton />
            ) : (
                <>
                    <UnitInputs values={values} currentUnits={currentUnits} handleChange={handleChange} handleFocus={handleFocus} />

                    <UnitOutput values={values} currentUnits={currentUnits} />
                </>
            )}
        </>
    )
}

export default UnitConverter
