export const useCopyToClipboard = () => {
    const copy = async (element, isRich) => {
        try {
            if (isRich) {
                const selection = element.current.innerHTML

                const blobHTML = new Blob([selection], { type: 'text/html' })

                // eslint-disable-next-line no-undef
                const clipboardItemHTML = new ClipboardItem({ 'text/html': blobHTML })
                await navigator.clipboard.write([clipboardItemHTML])
            } else {
                await navigator.clipboard.writeText(element)
            }
        } catch (error) {
            console.warn('Copy failed', error)
        }
    }

    return copy
}
