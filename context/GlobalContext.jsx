import { createContext, useCallback, useState } from 'react'

export const GlobalStateContext = createContext({
    toasts: {
        toastOpen: false,
        toastMessage: '',
        addToast: () => {},
        removeToast: () => {},
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

    const contextValue = {
        toasts: {
            toastOpen,
            toastMessage,
            addToast: useCallback((text) => addToast(text), []),
            removeToast: useCallback(() => removeToast(), []),
        },
    }

    return <GlobalStateContext.Provider value={contextValue}>{children}</GlobalStateContext.Provider>
}

export default GlobalStateProvider
