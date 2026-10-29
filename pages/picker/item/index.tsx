import { Box, Typography } from "@mui/material";

import { useCounter } from "@/hooks/useCounter";

import ItemForm from "@/features/RandomPicker/ItemPicker/ItemForm";
import { useItemPickerFormControls } from "@/features/RandomPicker/ItemPicker/useItemPickerFormControls";

import PageTitle from "@/components/common/PageTitle";
import SEO from "@/components/common/SEO";

export default function ItemPicker() {
  const {
    fileRef,
    resultRef,
    values,
    setValues,
    handleChange,
    handleFileUpload,
    handleRandomSelection,
    handleClick,
    handleCopy,
    handleReset,
  } = useItemPickerFormControls();
  const { handleDecrease, handleIncrease } = useCounter(values, setValues);

  return (
    <>
      <SEO
        description="Get a random item from a list."
        title="Random Picker"
        url="/picker/item"
        imageUrl="/item-picker.png"
      />

      <PageTitle>Item Picker</PageTitle>

      <Typography component="p" sx={{ marginBlockEnd: 5 }}>
        Get a random item from a list.
      </Typography>

      <Box sx={{ paddingBlockEnd: 8 }}>
        <ItemForm
          fileRef={fileRef}
          resultRef={resultRef}
          values={values}
          handleChange={handleChange}
          handleFileUpload={handleFileUpload}
          handleRandomSelection={handleRandomSelection}
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
