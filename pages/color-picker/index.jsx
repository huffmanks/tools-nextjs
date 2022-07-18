import { useEffect, useState } from 'react'

import { initialValues } from '../../constants/colorPicker'

import { Typography } from '@mui/material'

import SEO from '../../components/layout/SEO'
import PageTitle from '../../components/layout/PageTitle'

import Colord from '../../components/ColorPicker/Colord'
import ColorForm from '../../components/ColorPicker/ColorForm'
import ColorVariants from '../../components/ColorPicker/ColorVariants'

import { colord, extend } from 'colord'
import namesPlugin from 'colord/plugins/names'
extend([namesPlugin])

const ColorPicker = () => {
    const [color, setColor] = useState('#5b21b6')
    const [convertedColors, setConvertedColors] = useState(initialValues)

    const handleColor = (e) => {
        setColor(e.target.value)
    }

    useEffect(() => {
        setConvertedColors(() => ({
            hexColor: colord(color).toHex(),
            rgbColor: colord(color).toRgbString(),
            hslColor: colord(color).toHslString(),
            nameColor: colord(color).toName({ closest: true }),
            badgeColor: `linear-gradient(to right, ${colord(color).lighten(0.15).toHex()}, ${colord(color).darken(0.15).toHex()})`,
            textColor: colord(color).isDark() ? 'text.primary' : 'background.paper',
        }))
    }, [color])

    return (
        <>
            <SEO description='Choose a color in HEX, RGB or HSL.' title='Color Picker' url='/color-picker' imageUrl='/color-picker.png' />
            <PageTitle>Color Picker</PageTitle>

            <Colord color={color} onChange={setColor} />

            <ColorForm convertedColors={convertedColors} handleColor={handleColor} />

            <Typography
                variant='h4'
                component='h2'
                sx={{
                    width: 'max-content',
                    marginBottom: '2rem',
                    padding: '0.5rem 1rem',
                    background: convertedColors.badgeColor,
                    color: convertedColors.textColor,
                    borderRadius: '10px',
                    '@media screen and (max-width: 400px)': {
                        fontSize: '1.5rem',
                    },
                }}>
                Shades
            </Typography>

            <ColorVariants color={color} textColor={convertedColors.textColor} />
        </>
    )
}

export default ColorPicker
