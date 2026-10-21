import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton, InputAdornment, TextField } from "@mui/material";

import { type ItemPickerValues } from "@/features/RandomPicker/ItemPicker/constants";
import { type NumberPickerValues } from "@/features/RandomPicker/NumberPicker/constants";

interface CounterProps {
  isDisabled?: boolean;
  values: NumberPickerValues | ItemPickerValues;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleDecrease: () => void;
  handleIncrease: () => void;
}

const Counter = ({
  isDisabled,
  values,
  handleChange,
  handleDecrease,
  handleIncrease,
}: CounterProps) => {
  return (
    <>
      <TextField
        disabled={isDisabled}
        variant="outlined"
        label="Total"
        name="total"
        value={values?.total}
        onChange={handleChange}
        autoComplete="none"
        sx={{
          width: 150,
          marginBottom: {
            xs: 2,
            sm: 0,
          },
          input: {
            textAlign: "center",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                aria-label="decrement one"
                onClick={handleDecrease}
                disabled={(typeof values?.total === "number" && values?.total <= 1) || isDisabled}
                size="small"
                edge="end"
                sx={{
                  "&:hover": {
                    backgroundColor: "primary.main",
                  },
                }}>
                <RemoveIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="increment one"
                onClick={handleIncrease}
                disabled={isDisabled}
                size="small"
                edge="start"
                sx={{
                  "&:hover": {
                    backgroundColor: "primary.main",
                  },
                }}>
                <AddIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default Counter;
