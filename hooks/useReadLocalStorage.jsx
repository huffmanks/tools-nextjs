import { useCallback, useEffect, useState } from 'react'

import { useEventListener } from './useEventListener'

export const useReadLocalStorage = (key) => {
    const readValue = useCallback(() => {
        if (typeof window === 'undefined') {
            return null
        }

        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : null
        } catch (error) {
            console.warn(`Error reading localStorage key “${key}”:`, error)
            return null
        }
    }, [key])

    const [storedValue, setStoredValue] = useState(readValue)

    useEffect(() => {
        setStoredValue(readValue())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleStorageChange = useCallback(
        (event) => {
            if (event?.key && event.key !== key) {
                return
            }
            setStoredValue(readValue())
        },
        [key, readValue]
    )

    useEventListener('storage', handleStorageChange)

    useEventListener('local-storage', handleStorageChange)

    return storedValue
}
