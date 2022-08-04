import { createContext, useCallback, useState } from 'react'

export const GlobalStateContext = createContext({
    toasts: {
        message: '',
        addToast: () => {},
        removeToast: () => {},
    },
})

const GlobalStateProvider = ({ children }) => {
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false)

    const addToast = (text) => {
        setMessage(text)
        setOpen(true)
    }
    const removeToast = () => {
        setMessage('')
        setOpen(false)
    }

    const contextValue = {
        toasts: {
            message,
            open,
            addToast: useCallback((text) => addToast(text), []),
            removeToast: useCallback(() => removeToast(), []),
        },
    }

    return <GlobalStateContext.Provider value={contextValue}>{children}</GlobalStateContext.Provider>
}

export default GlobalStateProvider
