import { Box, Typography } from "@mui/material";

import InputContainer from "@/features/UnitCalculator/InputContainer";
import UnitInputs from "@/features/UnitCalculator/UnitInputs";
import UnitOutput from "@/features/UnitCalculator/UnitOutput";
import { useUnitCalculatorFormControls } from "@/features/UnitCalculator/useUnitCalculatorFormControls";

import PageTitle from "@/components/common/PageTitle";
import SEO from "@/components/common/SEO";
import Skelly from "@/components/common/Skelly";
import SkellyGroup from "@/components/common/SkellyGroup";

export default function UnitCalculator() {
  const { isLoading, values, currentUnits, handleChange, handleFocus } =
    useUnitCalculatorFormControls();

  return (
    <>
      <SEO
        description="Calculate different unit types."
        title="Unit Calculator"
        url="/calculate/units"
        imageUrl="/unit-calculator.png"
      />

      <PageTitle>Unit Calculator</PageTitle>

      <Typography component="p" sx={{ marginBlockEnd: 5 }}>
        Calculate different unit types.
      </Typography>

      <Box sx={{ paddingBlockEnd: 8 }}>
        {!isLoading ? (
          <>
            <UnitInputs
              values={values}
              currentUnits={currentUnits}
              handleChange={handleChange}
              handleFocus={handleFocus}
            />

            <UnitOutput values={values} currentUnits={currentUnits} />
          </>
        ) : (
          <>
            <InputContainer
              top={<Skelly type="input" />}
              center={<Skelly type="input" />}
              bottom={<Skelly type="input" />}
            />

            <SkellyGroup type="input" skellyAmount={3} gapSize={4} />
          </>
        )}
      </Box>
    </>
  );
}
