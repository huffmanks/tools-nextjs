import { colord, extend } from 'colord'
import mixPlugin from 'colord/plugins/mix'
extend([mixPlugin])

export const generateColorVariants = (color, tintType) => {
    const tints = [colord(color).lighten(0.15), colord(color).lighten(0.075), colord(color), colord(color).darken(0.075), colord(color).darken(0.15)]

    return tints.map((tint) => {
        if (tintType === 'hex') return tint.toHex()
        if (tintType === 'rgb') return tint.toRgbString()
        if (tintType === 'hsl') return tint.toHslString()
    })
}
