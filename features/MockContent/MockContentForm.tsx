import FeedIcon from "@mui/icons-material/Feed";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Stack,
} from "@mui/material";

import { mockContentElements } from "@/features/MockContent/constants";
import type { MockContentValues } from "@/features/MockContent/types";

interface MockContentFormProps {
  values: MockContentValues;
  checkAll: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckAll: () => void;
  handleReset: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const MockContentForm = ({
  values,
  checkAll,
  handleChange,
  handleCheckAll,
  handleReset,
  handleSubmit,
}: MockContentFormProps) => {
  const selectAllItem = mockContentElements[0];
  const blockElements = mockContentElements.slice(1, 10);
  const inlineElements = mockContentElements.slice(10);

  return (
    <Grid size={{ xs: 12, md: 5 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        autoComplete="off"
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <FormControlLabel
          control={<Checkbox checked={checkAll} onChange={handleCheckAll} name="check_all" />}
          label={selectAllItem.label}
        />
        <FormControl fullWidth component="fieldset" variant="outlined">
          <FormLabel component="legend">Elements</FormLabel>
          <FormGroup sx={{ flexDirection: { xs: "column", sm: "row" } }}>
            {blockElements.map((box) => (
              <FormControlLabel
                key={box.name}
                control={
                  <Checkbox
                    checked={values[`check_${box.name}`]}
                    onChange={handleChange}
                    name={`check_${box.name}`}
                  />
                }
                label={box.label}
              />
            ))}
          </FormGroup>
        </FormControl>

        <FormControl fullWidth component="fieldset" variant="outlined">
          <FormLabel component="legend">Inline Formatting</FormLabel>
          <FormGroup sx={{ flexDirection: { xs: "column", sm: "row" } }}>
            {inlineElements.map((box) => (
              <FormControlLabel
                key={box.name}
                control={
                  <Checkbox
                    checked={values[`check_${box.name}`]}
                    onChange={handleChange}
                    name={`check_${box.name}`}
                  />
                }
                label={box.label}
              />
            ))}
          </FormGroup>
        </FormControl>

        <Stack direction={{ xs: "column", sm: "row" }} sx={{ marginBlockEnd: 2, gap: 2 }}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            aria-label="generate mock content"
            endIcon={<FeedIcon />}>
            Generate
          </Button>
          <Button
            fullWidth
            type="button"
            variant="contained"
            size="large"
            aria-label="reset mock content form"
            endIcon={<RestartAltIcon />}
            onClick={handleReset}>
            Reset
          </Button>
        </Stack>
      </Box>
    </Grid>
  );
};

export default MockContentForm;
