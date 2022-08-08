import { createContext, useCallback, useState } from 'react'

export const GlobalStateContext = createContext({
    toasts: {
        toastOpen: false,
        toastMessage: '',
        addToast: () => {},
        removeToast: () => {},
    },
    modals: {
        modalId: null,
        modalOpen: false,
        addModal: () => {},
        removeModal: () => {},
    },
})

const GlobalStateProvider = ({ children }) => {
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    const addToast = (text) => {
        setToastMessage(text)
        setToastOpen(true)
    }

    const removeToast = () => {
        setToastOpen(false)
        setToastMessage('')
    }

    const [modalId, setModalId] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    const addModal = (id) => {
        setModalId(id)
        setModalOpen(true)
    }

    const removeModal = () => {
        setModalOpen(false)
        setModalId(null)
    }

    const contextValue = {
        toasts: {
            toastOpen,
            toastMessage,
            addToast: useCallback((text) => addToast(text), []),
            removeToast: useCallback(() => removeToast(), []),
        },
        modals: {
            modalId,
            modalOpen,
            addModal: useCallback((id) => addModal(id), []),
            removeModal: useCallback(() => removeModal(), []),
        },
    }

    return <GlobalStateContext.Provider value={contextValue}>{children}</GlobalStateContext.Provider>
}

export default GlobalStateProvider
