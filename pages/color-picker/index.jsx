import { useState, useEffect } from 'react'

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
    const [hexColor, setHexColor] = useState('#5b21b6')
    const [rgbColor, setRgbColor] = useState('rgb(91, 33, 182)')
    const [hslColor, setHslColor] = useState('hsl(263, 69%, 42%)')
    const [nameColor, setNameColor] = useState('rebeccapurple')

    const handleColor = (e) => {
        setColor(e.target.value)
    }

    useEffect(() => {
        setHexColor(() => colord(color).toHex())
        setRgbColor(() => colord(color).toRgbString())
        setHslColor(() => colord(color).toHslString())
        setNameColor(() => colord(color).toName({ closest: true }))
    }, [color])

    return (
        <>
            <SEO description='Choose a color in HEX, RGB or HSL.' title='Color Picker' url='/color-picker' />
            <PageTitle>Color Picker</PageTitle>

            <Colord color={color} onChange={setColor} />

            <ColorForm color={color} hexColor={hexColor} rgbColor={rgbColor} hslColor={hslColor} nameColor={nameColor} handleColor={handleColor} />

            <Typography
                variant='h4'
                component='h2'
                sx={{
                    width: 'max-content',
                    marginBottom: '2rem',
                    padding: '0.5rem 1rem',
                    background: `linear-gradient(to right, ${colord(color).lighten(0.15).toHex()}, ${colord(color).darken(0.15).toHex()})`,
                    color: colord(color).isDark() ? '#fff' : '#222',
                    borderRadius: '10px',
                    '@media screen and (max-width: 400px)': {
                        fontSize: '1.5rem',
                    },
                }}>
                Shades
            </Typography>

            <ColorVariants color={color} />
        </>
    )
}

export default ColorPicker
