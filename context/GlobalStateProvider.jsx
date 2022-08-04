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
        modalData: [],
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
    const [modalData, setModalData] = useState([])

    const addModal = (arr, id) => {
        const data = arr.filter((item) => {
            return item.id === id
        })

        setModalId(id)
        setModalData(data[0])
        setModalOpen(true)
    }

    const removeModal = () => {
        setModalOpen(false)
        setModalId(null)
        setModalData([])
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
            modalData,
            addModal: useCallback((arr, id) => addModal(arr, id), []),
            removeModal: useCallback(() => removeModal(), []),
        },
    }

    return <GlobalStateContext.Provider value={contextValue}>{children}</GlobalStateContext.Provider>
}

export default GlobalStateProvider
