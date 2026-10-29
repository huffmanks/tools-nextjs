import { useEffect } from "react";

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    let startedInside = false;
    let startedWhenMounted = false;

    const listener = (event: MouseEvent) => {
      if (startedInside || !startedWhenMounted) return;
      if (!ref.current || ref.current.contains(event.target as Node)) return;

      handler(event);
    };

    const validateEventStart = (event: MouseEvent | TouchEvent) => {
      startedWhenMounted = !!ref.current;
      startedInside = !!(
        ref.current &&
        event.target instanceof Node &&
        ref.current.contains(event.target)
      );
    };

    document.addEventListener("mousedown", validateEventStart);
    document.addEventListener("touchstart", validateEventStart);
    document.addEventListener("click", listener as EventListener);

    return () => {
      document.removeEventListener("mousedown", validateEventStart);
      document.removeEventListener("touchstart", validateEventStart);
      document.removeEventListener("click", listener as EventListener);
    };
  }, [ref, handler]);
}
