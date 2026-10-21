import { useContext } from "react";

import { GlobalStateContext } from "../context/GlobalContext";

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);

  return {
    ...context.toasts,
  };
};
