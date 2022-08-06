import { Box } from '@mui/material'

import Skelly from './Skelly'

const SkellyGroup = ({ skellyAmount, gapSize }) => {
    const itemDynamicWidth = {
        xs: '100%',
        ...(skellyAmount === 2 && {
            md: '50%',
        }),
        ...(skellyAmount === 3 && {
            md: '36.2%',
        }),
    }

    const styles = {
        items: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: gapSize,
        },
        item: {
            maxWidth: itemDynamicWidth,
            flexBasis: itemDynamicWidth,
        },
    }

    return (
        <Box sx={styles.items}>
            {Array.from(Array(skellyAmount).keys()).map((_, i) => (
                <Box key={i} sx={styles.item}>
                    <Skelly type='input' />
                </Box>
            ))}
        </Box>
    )
}

export default SkellyGroup
