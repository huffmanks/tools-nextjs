import { generateColorVariants } from '../../utilities/generateColorVariants'

import { Box } from '@mui/material'
import ColorItem from './ColorItem'

const ColorVariants = ({ color, textColor }) => {
    const tints = generateColorVariants(color)

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 4,
                '@media (max-width: 500px)': {
                    gridTemplateColumns: '1fr',
                },
            }}>
            {tints.map((tint, index) => (
                <Box
                    key={index}
                    sx={{
                        borderRadius: '15px',
                        overflow: 'hidden',
                    }}>
                    <ColorItem textColor={textColor} colorValue={tint.lightest} />
                    <ColorItem textColor={textColor} colorValue={tint.lighter} />
                    <ColorItem textColor={textColor} colorValue={tint.original} />
                    <ColorItem textColor={textColor} colorValue={tint.darker} />
                    <ColorItem textColor={textColor} colorValue={tint.darkest} />
                </Box>
            ))}
        </Box>
    )
}

export default ColorVariants
