import DeleteIcon from "@mui/icons-material/Delete";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SaveIcon from "@mui/icons-material/Save";
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";

import { textFormatterCards } from "@/features/TextFormatter/constants";
import type { TextFormatterValues } from "@/features/TextFormatter/types";

interface ActionGroupProps {
  values: TextFormatterValues;
  checkAll: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckAll: (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  handleSave: () => void;
  handleReset: () => void;
  handleDeleteSaved: (id: string) => void;
}

const ActionGroup = ({
  values,
  checkAll,
  handleChange,
  handleCheckAll,
  handleSave,
  handleReset,
  handleDeleteSaved,
}: ActionGroupProps) => {
  return (
    <>
      <Grid size={{ xs: 12, md: 7, lg: 9 }}>
        <TextField
          fullWidth
          select
          disabled={!values?.saved?.length}
          label="Saved Items"
          name="selectedId"
          value={values?.selectedId || ""}
          onChange={handleChange}
          slotProps={{
            select: {
              MenuProps: { className: "saved-items-dropdown" },
            },
          }}
          sx={{
            "& .MuiIconButton-root": {
              display: "none",
            },
            ".saved-items-dropdown & .MuiIconButton-root": {
              display: "flex",
            },
          }}>
          {(values?.saved || []).map((option) => (
            <MenuItem
              key={option.id}
              value={option.id}
              sx={{ display: "flex", justifyContent: "space-between" }}>
              {option.label}
              <IconButton
                edge="start"
                aria-label="remove saved item"
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteSaved(option.id);
                }}>
                <DeleteIcon />
              </IconButton>
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 5, lg: 3 }}>
        <ButtonGroup fullWidth variant="contained" sx={{ height: "100%" }}>
          <Button
            sx={{ height: "100%" }}
            onClick={handleSave}
            aria-label="save output"
            endIcon={<SaveIcon />}>
            Save
          </Button>
          <Button
            fullWidth
            sx={{ height: "100%" }}
            onClick={handleReset}
            aria-label="reset form"
            endIcon={<RestartAltIcon />}>
            Reset
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControl fullWidth component="fieldset" variant="outlined">
          <FormLabel component="legend">Select formats</FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={checkAll} onChange={handleCheckAll} name="check_all" />}
              label="Select all"
            />
            {textFormatterCards.map((box) => (
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
      </Grid>
    </>
  );
};

export default ActionGroup;
