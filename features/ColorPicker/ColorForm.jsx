import { Box } from '@mui/material'
import ColorInput from './ColorInput'

const ColorForm = ({ convertedColors, handleColor }) => {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    md: 'repeat(auto-fit, minmax(210px, 1fr))',
                },
                gap: 2,
            }}
            autoComplete='off'
            onChange={handleColor}>
            <ColorInput inputLabel='HEX' inputName='hexColor' colorType={convertedColors.hexColor} />
            <ColorInput inputLabel='RGB' inputName='rgbColor' colorType={convertedColors.rgbColor} />
            <ColorInput inputLabel='HSL' inputName='hslColor' colorType={convertedColors.hslColor} />
            <ColorInput inputLabel='Color' inputName='nameColor' colorType={convertedColors.nameColor} />
        </Box>
    )
}

export default ColorForm
