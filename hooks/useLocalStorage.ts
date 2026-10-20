import { useCallback, useSyncExternalStore } from "react";

import { useEventCallback } from "./useEventCallback";

function parseJSON<T>(value: string | null, fallback: T): T {
  if (value === null) return fallback;

  try {
    return (value === "undefined" ? undefined : JSON.parse(value)) as T;
  } catch {
    return fallback;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const getInitialValue = useCallback(
    () => (typeof initialValue === "function" ? (initialValue as () => T)() : initialValue),
    [initialValue],
  );

  const subscribe = useCallback(
    (callback: () => void) => {
      function handleStorageChange(event: Event) {
        if (event.type === "storage") {
          const storageEvent = event as StorageEvent;
          if (storageEvent.key !== null && storageEvent.key !== key) return;
        }

        callback();
      }

      window.addEventListener("storage", handleStorageChange);
      window.addEventListener("local-storage", handleStorageChange);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener("local-storage", handleStorageChange);
      };
    },
    [key],
  );

  const getSnapshot = useCallback(() => {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }, [key]);

  const getServerSnapshot = useCallback(() => null, []);

  const storedItem = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const storedValue = parseJSON(storedItem, getInitialValue());

  const setValue = useEventCallback((value: T | ((previousValue: T) => T)) => {
    if (typeof window === "undefined") {
      console.warn(`Tried setting localStorage key “${key}” outside the browser`);
      return;
    }

    try {
      const currentValue = parseJSON(window.localStorage.getItem(key), getInitialValue());
      const newValue = value instanceof Function ? value(currentValue) : value;

      window.localStorage.setItem(key, JSON.stringify(newValue));
      window.dispatchEvent(new Event("local-storage"));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  });

  return [storedValue, setValue] as const;
}
