import { useEffect, useState } from 'react'

import { generateColorVariants } from './generateColorVariants'
import { initialColors } from '../../constants/colorPicker'

import { colord, extend } from 'colord'
import namesPlugin from 'colord/plugins/names'
extend([namesPlugin])

export const useColorPickerFormControls = () => {
    const [color, setColor] = useState('#5b21b6')
    const [convertedColors, setConvertedColors] = useState(initialColors)
    const [tintType, setTintType] = useState('hex')

    const handleColor = (e) => {
        setColor(e.target.value)
    }

    const handleTintType = (e) => {
        setTintType(e.target.value)
    }

    useEffect(() => {
        const tints = generateColorVariants(color, tintType)

        setConvertedColors(() => ({
            hexColor: colord(color).toHex(),
            rgbColor: colord(color).toRgbString(),
            hslColor: colord(color).toHslString(),
            nameColor: colord(color).toName({ closest: true }),
            badgeColor: `linear-gradient(to right, ${colord(color).lighten(0.15).toHex()}, ${colord(color).darken(0.15).toHex()})`,
            textColor: colord(color).isDark() ? 'text.primary' : 'background.paper',
            tintType,
            tints,
        }))
    }, [color, tintType])

    return {
        color,
        convertedColors,
        tintType,
        setColor,
        handleColor,
        handleTintType,
    }
}
