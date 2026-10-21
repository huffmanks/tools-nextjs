import { useContext } from "react";

import { GlobalStateContext } from "../context/GlobalContext";
import { TodoStateContext } from "../context/TodoContext";

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);

  return {
    ...context.toasts,
    ...context.modal,
  };
};

export const useLists = () => {
  return useContext(TodoStateContext);
};
