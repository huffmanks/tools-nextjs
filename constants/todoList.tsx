import EditIcon from "@mui/icons-material/Edit";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ViewListIcon from "@mui/icons-material/ViewList";

import { GLOBAL_SITE_LS_KEY_PREFIX } from "./global";

export const TODO_LISTS_LS_KEY = `${GLOBAL_SITE_LS_KEY_PREFIX}_todo-lists`;

export const initialValues = {
  type: "shopping",
  title: "",
  tempItem: "",
};

export const initialErrors = {
  title: false,
  item: false,
};

export const navItems = [
  { label: "Create", value: "create", icon: <NoteAddIcon /> },
  { label: "View", value: "view", icon: <ViewListIcon /> },
  { label: "Edit", value: "edit", icon: <EditIcon />, editIcon: true },
];
