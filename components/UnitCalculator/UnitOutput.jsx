import { formatConvertNumber } from '../../utilities/formatConvertNumber'

import { Box } from '@mui/material'

const UnitOutput = ({ values, currentUnits }) => {
    // const isPixel = (option) => {
    //     return values.measurement === 'length' && option.unit.startsWith('p')
    // }

    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {currentUnits
                    .filter((item) => item.unit !== values.unitSelection && formatConvertNumber(values.numInput, values.unitSelection, item.unit) !== 0)
                    .map((option) => (
                        <Box
                            key={option.id}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                maxWidth: {
                                    xs: '100%',
                                    md: '36.2%',
                                },
                                flexBasis: {
                                    xs: '100%',
                                    md: '36.2%',
                                },
                                backgroundColor: 'background.secondary',
                                borderRadius: 1,
                                overflow: 'hidden',
                            }}>
                            <Box sx={{ padding: 2 }}>{option.label}</Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    backgroundColor: 'primary.main',
                                    padding: '16px 16px 16px 24px',
                                    borderTopLeftRadius: 50,
                                    borderBottomLeftRadius: 50,
                                }}>
                                {values.numInput && <div>{formatConvertNumber(values.numInput, values.unitSelection, option.unit)}</div>}
                                <div>{option.short}</div>
                            </Box>
                        </Box>
                    ))}
            </Box>
        </>
    )
}

export default UnitOutput
