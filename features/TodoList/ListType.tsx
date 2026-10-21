import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

import { type TodoListForm } from "./useTodoListFormControls";

interface ListTypeProps {
  list: TodoListForm;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, value?: string) => void;
}

const ListType = ({ list, handleChange }: ListTypeProps) => {
  return (
    <FormControl sx={{ mb: 3 }}>
      <FormLabel>List type</FormLabel>
      <RadioGroup row name="type" value={list.type} onChange={handleChange}>
        <FormControlLabel value="shopping" control={<Radio color="primary" />} label="Shopping" />
        <FormControlLabel value="task" control={<Radio color="primary" />} label="Task" />
      </RadioGroup>
    </FormControl>
  );
};

export default ListType;
