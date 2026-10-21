import { useContext } from "react";

import { TodoStateContext } from "@/features/TodoList/TodoContext";

export const useLists = () => {
  return useContext(TodoStateContext);
};
