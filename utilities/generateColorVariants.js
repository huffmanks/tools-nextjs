import { colord, extend } from 'colord'
import mixPlugin from 'colord/plugins/mix'
extend([mixPlugin])

export const generateColorVariants = (color) => {
    const tints = [
        {
            darkest: colord(color).darken(0.15).toHex(),
            darker: colord(color).darken(0.075).toHex(),
            original: colord(color).toHex(),
            lighter: colord(color).lighten(0.075).toHex(),
            lightest: colord(color).lighten(0.15).toHex(),
        },
        {
            darkest: colord(color).darken(0.15).toRgbString(),
            darker: colord(color).darken(0.075).toRgbString(),
            original: colord(color).toRgbString(),
            lighter: colord(color).lighten(0.075).toRgbString(),
            lightest: colord(color).lighten(0.15).toRgbString(),
        },

        {
            darkest: colord(color).darken(0.15).toHslString(),
            darker: colord(color).darken(0.075).toHslString(),
            original: colord(color).toHslString(),
            lighter: colord(color).lighten(0.075).toHslString(),
            lightest: colord(color).lighten(0.15).toHslString(),
        },
    ]

    return tints
}
