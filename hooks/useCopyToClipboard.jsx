import { useState } from 'react'

export const useCopyToClipboard = (isRich) => {
    const [copiedText, setCopiedText] = useState(null)

    const copy = async (element) => {
        try {
            if (isRich) {
                const selection = element.innerHTML

                const blobHTML = new Blob([selection], { type: 'text/html' })

                const clipboardItemHTML = new ClipboardItem({ 'text/html': blobHTML })
                await navigator.clipboard.write([clipboardItemHTML])

                setCopiedText(element.innerHTML)
                return true
            } else {
                await navigator.clipboard.writeText(element.innerText)

                setCopiedText(element.innerText)
                return true
            }
        } catch (error) {
            setCopiedText(null)
            return false
        }
    }

    return [copiedText, copy]
}
