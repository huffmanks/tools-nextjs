import { useState } from "react";

export const useCopyToClipboard = (isElement: boolean, isRich?: boolean) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = async (element: HTMLElement | string): Promise<boolean> => {
    try {
      if (isElement) {
        if (isRich && element instanceof HTMLElement) {
          const selection = element.innerHTML;
          const blobHTML = new Blob([selection], { type: "text/html" });

          const clipboardItemHTML = new ClipboardItem({ "text/html": blobHTML });
          await navigator.clipboard.write([clipboardItemHTML]);

          setCopiedText(element.innerHTML);
          return true;
        }

        if (element instanceof HTMLElement) {
          await navigator.clipboard.writeText(element.innerText);
          setCopiedText(element.innerText);
          return true;
        }
      }

      if (typeof element === "string") {
        await navigator.clipboard.writeText(element);
        setCopiedText(element);
        return true;
      }

      return false;
    } catch (_error) {
      setCopiedText(null);
      return false;
    }
  };

  return [copy, copiedText] as const;
};
