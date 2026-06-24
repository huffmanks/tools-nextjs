import FeedIcon from "@mui/icons-material/Feed";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Stack } from "@mui/material";

import { elements } from "../../constants/mockContent";

const MockContentForm = ({ values, checkAll, handleChange, handleCheckAll, handleReset, handleSubmit }) => {
  return (
    <Grid item xs={12} md={5}>
      <Box component="form" onSubmit={handleSubmit} autoComplete="off" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <FormControl fullWidth component="fieldset" variant="outlined">
          <FormLabel component="legend">Elements</FormLabel>
          <FormGroup>
            <Grid container display="grid" gridTemplateColumns={{ xs: "1fr", md: "repeat(2, 1fr)" }} gapx={1}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {elements
                  .slice(0, 5)
                  .map((box) =>
                    box.isSelectAll ? (
                      <FormControlLabel key="check_all" control={<Checkbox checked={checkAll} onChange={handleCheckAll} name="check_all" />} label={box.label} />
                    ) : (
                      <FormControlLabel key={box.name} control={<Checkbox checked={values[`check_${box.name}`]} onChange={handleChange} name={`check_${box.name}`} />} label={box.label} />
                    ),
                  )}
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {elements
                  .slice(5, 10)
                  .map((box) =>
                    box.isSelectAll ? (
                      <FormControlLabel key="check_all" control={<Checkbox checked={checkAll} onChange={handleCheckAll} name="check_all" />} label={box.label} />
                    ) : (
                      <FormControlLabel key={box.name} control={<Checkbox checked={values[`check_${box.name}`]} onChange={handleChange} name={`check_${box.name}`} />} label={box.label} />
                    ),
                  )}
              </Box>
            </Grid>
          </FormGroup>
        </FormControl>

        <Stack direction={{ xs: "column", sm: "row" }} gap={2} mb={2}>
          <Button fullWidth type="submit" variant="contained" size="large" aria-label="generate mock content" endIcon={<FeedIcon />}>
            Generate
          </Button>
          <Button fullWidth type="button" variant="contained" size="large" aria-label="reset mock content form" endIcon={<RestartAltIcon />} onClick={handleReset}>
            Reset
          </Button>
        </Stack>
      </Box>
    </Grid>
  );
};

export default MockContentForm;
