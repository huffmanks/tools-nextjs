import { createContext, useCallback, useState } from "react";

interface ToastState {
  toastOpen: boolean;
  toastMessage: string;
  addToast: (text: string) => void;
  removeToast: () => void;
}

interface ModalState {
  modalOpen: boolean;
  addModal: () => void;
  removeModal: () => void;
}

interface GlobalStateContextType {
  toasts: ToastState;
  modal: ModalState;
}

export const GlobalStateContext = createContext<GlobalStateContextType>({
  toasts: {
    toastOpen: false,
    toastMessage: "",
    addToast: () => {},
    removeToast: () => {},
  },
  modal: {
    modalOpen: false,
    addModal: () => {},
    removeModal: () => {},
  },
});

interface GlobalStateProviderProps {
  children: React.ReactNode;
}

const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const addToast = (text: string) => {
    setToastMessage(text);
    setToastOpen(true);
  };

  const removeToast = () => {
    setToastOpen(false);
    setToastMessage("");
  };

  const addModal = () => {
    setModalOpen(true);
  };

  const removeModal = () => {
    setModalOpen(false);
  };

  const contextValue = {
    toasts: {
      toastOpen,
      toastMessage,
      addToast: useCallback((text: string) => addToast(text), []),
      removeToast: useCallback(() => removeToast(), []),
    },
    modal: {
      modalOpen,
      addModal: useCallback(() => addModal(), []),
      removeModal: useCallback(() => removeModal(), []),
    },
  };

  return <GlobalStateContext.Provider value={contextValue}>{children}</GlobalStateContext.Provider>;
};

export default GlobalStateProvider;
