import { useContext } from "react";

import { GlobalStateContext } from "@/context/GlobalContext";

export function useGlobalState() {
  const context = useContext(GlobalStateContext);

  return {
    ...context.toasts,
  };
}
