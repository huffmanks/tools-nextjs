import { useContext } from 'react'

import { GlobalStateContext } from '../context/GlobalStateProvider'

export const useGlobalState = () => {
    const { toasts, modals } = useContext(GlobalStateContext)

    const { toastOpen, toastMessage, addToast, removeToast } = toasts
    const { modalId, modalOpen, modalData, addModal, removeModal } = modals

    return { toastOpen, toastMessage, addToast, removeToast, modalId, modalOpen, modalData, addModal, removeModal }
}
