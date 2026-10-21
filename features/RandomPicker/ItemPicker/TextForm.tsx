import { Grid, type SelectChangeEvent, Stack, TextField } from "@mui/material";

import FieldsetContainer from "@/features/RandomPicker/FieldsetContainer";
import TextDelimiters from "@/features/RandomPicker/ItemPicker/TextDelimiters";
import { type ItemPickerValues } from "@/features/RandomPicker/ItemPicker/constants";

import Counter from "@/components/common/Counter";

interface TextFormProps {
  values: ItemPickerValues;
  errorMessage?: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => void;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleDecrease: () => void;
  handleIncrease: () => void;
}

const TextForm = ({
  values,
  errorMessage,
  handleChange,
  handleBlur,
  handleDecrease,
  handleIncrease,
}: TextFormProps) => {
  return (
    <Grid item xs={12} md={7}>
      <FieldsetContainer
        title="Result options"
        size="large"
        isFullWidth
        helperText={`There will be ${values?.total} item${values?.total > 1 ? "s" : ""} selected from the list.`}>
        <Stack direction={{ xs: "column", md: "row" }} gap={{ xs: 0, sm: 2 }} mb={1}>
          <Counter
            values={values}
            handleChange={handleChange}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
          />
          <TextDelimiters values={values} handleChange={handleChange} />
        </Stack>
      </FieldsetContainer>

      <TextField
        id="list"
        className="global-scrollbar"
        fullWidth
        variant="filled"
        multiline
        minRows={4}
        maxRows={8}
        name="list"
        label="List Items"
        placeholder="Insert a list here"
        value={values.list}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!errorMessage}
        {...(errorMessage && {
          error: true,
          helperText: errorMessage,
        })}
        sx={{
          marginBottom: 1,
        }}
      />
    </Grid>
  );
};

export default TextForm;
