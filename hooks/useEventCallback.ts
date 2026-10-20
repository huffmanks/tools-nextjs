import { useCallback, useRef } from "react";

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export function useEventCallback<Args extends unknown[], R>(fn: (...args: Args) => R) {
  const ref = useRef<(...args: Args) => R>(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });

  useIsomorphicLayoutEffect(() => {
    ref.current = fn;
  }, [fn]);

  return useCallback((...args: Args) => ref.current(...args), []);
}
