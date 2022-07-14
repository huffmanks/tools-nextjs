import { useState } from 'react'

import { useEventListener } from './useEventListener'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
        isMobile: null,
    })

    const handleSize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
            isMobile: window.innerWidth < 600,
        })
    }

    useEventListener('resize', handleSize)

    useIsomorphicLayoutEffect(() => {
        handleSize()
    }, [])

    return windowSize
}
