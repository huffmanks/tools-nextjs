import { Box, Typography } from "@mui/material";

import { useCounter } from "@/hooks/useCounter";

import NumberForm from "@/features/RandomPicker/NumberPicker/NumberForm";
import { useNumberPickerFormControls } from "@/features/RandomPicker/NumberPicker/useNumberPickerFormControls";

import PageTitle from "@/components/common/PageTitle";
import SEO from "@/components/common/SEO";

export default function NumberPicker() {
  const { resultRef, values, setValues, handleChange, handleClick, handleCopy, handleReset } =
    useNumberPickerFormControls();

  const { handleDecrease, handleIncrease } = useCounter(values, setValues);

  return (
    <>
      <SEO
        description="Get a random number from a range."
        title="Number Picker"
        url="/picker/number"
        imageUrl="/number-picker.png"
      />

      <PageTitle>Number Picker</PageTitle>

      <Typography component="p" sx={{ marginBlockEnd: 5 }}>
        Get a random number from a range.
      </Typography>

      <Box sx={{ paddingBlockEnd: 8 }}>
        <NumberForm
          resultRef={resultRef}
          values={values}
          handleChange={handleChange}
          handleClick={handleClick}
          handleCopy={handleCopy}
          handleReset={handleReset}
          handleDecrease={handleDecrease}
          handleIncrease={handleIncrease}
        />
      </Box>
    </>
  );
}
