import { useContext } from 'react'

import { GlobalStateContext } from '../context/GlobalContext'
import { TodoStateContext } from '../context/TodoContext'

export const useGlobalState = () => {
    const { toasts } = useContext(GlobalStateContext)

    const { toastOpen, toastMessage, addToast, removeToast } = toasts

    return { toastOpen, toastMessage, addToast, removeToast }
}

export const useLists = () => {
    return useContext(TodoStateContext)
}
