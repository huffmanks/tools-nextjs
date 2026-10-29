import { createContext, useCallback, useState } from "react";

interface ToastState {
  toastOpen: boolean;
  toastMessage: string;
  addToast: (text: string) => void;
  removeToast: () => void;
}

interface GlobalStateContextType {
  toasts: ToastState;
}

interface GlobalStateProviderProps {
  children: React.ReactNode;
}

export const GlobalStateContext = createContext<GlobalStateContextType>({
  toasts: {
    toastOpen: false,
    toastMessage: "",
    addToast: () => {},
    removeToast: () => {},
  },
});

export default function GlobalStateProvider({ children }: GlobalStateProviderProps) {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const addToast = (text: string) => {
    setToastMessage(text);
    setToastOpen(true);
  };

  const removeToast = () => {
    setToastOpen(false);
    setToastMessage("");
  };

  const contextValue = {
    toasts: {
      toastOpen,
      toastMessage,
      addToast: useCallback((text: string) => addToast(text), []),
      removeToast: useCallback(() => removeToast(), []),
    },
  };

  return <GlobalStateContext.Provider value={contextValue}>{children}</GlobalStateContext.Provider>;
}
