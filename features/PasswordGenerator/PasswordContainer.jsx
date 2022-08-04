import { Box, Stack } from '@mui/material'
import React from 'react'

const PasswordContainer = ({ top, center, bottom }) => {
    return (
        <Stack direction={{ xs: 'column', lg: 'row' }} sx={{ gap: '0 64px' }}>
            <div>{top}</div>

            <div>
                {center}
                <Box
                    marginBottom={5}
                    sx={{
                        width: {
                            sm: '50%',
                            lg: '100%',
                        },
                        paddingInline: 1,
                    }}>
                    {bottom}
                </Box>
            </div>
        </Stack>
    )
}

export default PasswordContainer
