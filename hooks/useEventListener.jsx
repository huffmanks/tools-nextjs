import { useEffect, useRef } from 'react'

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

export const useEventListener = (eventName, handler, element, options) => {
    const savedHandler = useRef(handler)

    useIsomorphicLayoutEffect(() => {
        savedHandler.current = handler
    }, [handler])

    useEffect(() => {
        const targetElement = element?.current || window
        if (!(targetElement && targetElement.addEventListener)) {
            return
        }

        const eventListener = (event) => savedHandler.current(event)

        targetElement.addEventListener(eventName, eventListener, options)

        return () => {
            targetElement.removeEventListener(eventName, eventListener)
        }
    }, [eventName, element, options])
}
