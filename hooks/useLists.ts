import { useContext } from "react";

import { TodoStateContext } from "@/context/TodoContext";

export const useLists = () => {
  return useContext(TodoStateContext);
};
