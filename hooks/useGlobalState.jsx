import { useContext } from 'react'

import { GlobalStateContext } from '../context/GlobalStateProvider'

export const useGlobalState = () => {
    const { toasts } = useContext(GlobalStateContext)

    const { message, open, addToast, removeToast } = toasts

    return { message, open, addToast, removeToast }
}
