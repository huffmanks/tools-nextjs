import { useEffect, useState } from 'react'

import { generateColorVariants } from '../../../utilities/generateColorVariants'
import { initialColors } from '../../../constants/colorPicker'

import { Grid, Typography } from '@mui/material'

import SEO from '../../../components/layout/SEO'
import PageTitle from '../../../components/layout/PageTitle'

import Colord from '../../../components/ColorPicker/Colord'
import ColorForm from '../../../components/ColorPicker/ColorForm'
import ColorVariants from '../../../components/ColorPicker/ColorVariants'

import { colord, extend } from 'colord'
import namesPlugin from 'colord/plugins/names'
extend([namesPlugin])

const ColorPicker = () => {
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

    return (
        <>
            <SEO description='Choose a color in HEX, RGB or HSL.' title='Color Picker' url='/picker/color' imageUrl='/color-picker.png' />
            <PageTitle>Color Picker</PageTitle>

            <Typography paragraph mb={5}>
                Choose a color in HEX, RGB or HSL.
            </Typography>

            <Grid container spacing={5}>
                <Grid item xs={12} md={6}>
                    <Colord color={color} onChange={setColor} />

                    <ColorForm convertedColors={convertedColors} handleColor={handleColor} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography
                        variant='h4'
                        component='h2'
                        sx={{
                            width: 'max-content',
                            marginBottom: 4,
                            padding: '0.5rem 1rem',
                            background: convertedColors.badgeColor,
                            color: convertedColors.textColor,
                            borderRadius: '10px',
                            fontSize: {
                                xs: '1.5rem',
                                md: '2.125rem',
                            },
                        }}>
                        Tints
                    </Typography>

                    <ColorVariants convertedColors={convertedColors} tintType={tintType} handleTintType={handleTintType} />
                </Grid>
            </Grid>
        </>
    )
}

export default ColorPicker
