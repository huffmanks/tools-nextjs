import { formatConvertNumber } from '../../utilities/formatConvertNumber'

import { Box, Stack } from '@mui/material'

const UnitOutput = ({ values, currentUnits }) => {
    return (
        <>
            <Box>
                <Stack spacing={2}>
                    {currentUnits.map((option) => (
                        <Box
                            key={option.id}
                            sx={{
                                width: {
                                    sx: '100%',
                                    sm: 'fit-content',
                                },
                                padding: '10px 15px',
                                backgroundColor: 'background.secondary',
                                borderRadius: '6px',
                            }}>
                            <span>{option.label}</span>
                            <span style={{ margin: '0 10px' }}>|</span>
                            {values.fromInput && values.toInput && (
                                <>
                                    <span>{formatConvertNumber(values.fromInput, values.fromSelection, option.unit)}</span>
                                </>
                            )}

                            <span> {option.short}</span>
                        </Box>
                    ))}
                </Stack>
            </Box>
        </>
    )
}

export default UnitOutput
