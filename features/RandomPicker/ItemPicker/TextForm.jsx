import { Grid, Stack, TextField } from "@mui/material";

import Counter from "../../../components/common/Counter";
import FieldsetContainer from "../FieldsetContainer";
import TextDelimiters from "./TextDelimiters";

const TextForm = ({ values, errorMessage, handleChange, handleBlur, handleDecrease, handleIncrease }) => {
  return (
    <Grid item xs={12} md={7}>
      <FieldsetContainer title="Result options" size="large" isFullWidth helperText={`There will be ${values?.total} item${values?.total > 1 ? "s" : ""} selected from the list.`}>
        <Stack direction={{ xs: "column", md: "row" }} gap={{ xs: 0, sm: 2 }} mb={1}>
          <Counter values={values} handleChange={handleChange} handleDecrease={handleDecrease} handleIncrease={handleIncrease} />
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
