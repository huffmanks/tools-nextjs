import { useContext } from "react";

import { TodoStateContext } from "@/features/TodoList/TodoContext";

export function useLists() {
  return useContext(TodoStateContext);
}
