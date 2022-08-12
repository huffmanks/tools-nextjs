const getAspectGCD = (...arr) => {
    const gcd = (x, y) => (!y ? x : getAspectGCD(y, x % y))
    return [...arr].reduce((a, b) => gcd(a, b))
}

export const getAspectNumbers = (values) => {
    const newOtherSize =
        values.newSize === ''
            ? ''
            : values.selectedType === 'width'
            ? Math.round((values.originalHeight / values.originalWidth) * values.newSize * 100) / 100
            : Math.round((values.originalWidth / values.originalHeight) * values.newSize * 100) / 100

    const newWidth = values.selectedType === 'width' ? values.newSize : newOtherSize
    const newHeight = values.selectedType === 'height' ? values.newSize : newOtherSize

    const hasDimensions = !!newWidth && !!newHeight && !!values.originalWidth && !!values.originalHeight ? true : false

    const dimensions = hasDimensions ? `${newWidth} x ${newHeight}` : ''

    const aspectGCD = getAspectGCD(parseInt(values.originalWidth), parseInt(values.originalHeight))

    const aspectMultiplier = (values.originalWidth / values.originalHeight).toFixed(2)

    const aspectRatio = `${values.originalWidth / aspectGCD}:${values.originalHeight / aspectGCD}`

    return { newWidth, newHeight, aspectMultiplier, aspectRatio, dimensions }
}
