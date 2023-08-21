import { Stack } from '@mui/material'
import React from 'react'

const PasswordContainer = ({ left, right }) => {
    return (
        <Stack direction={{ xs: 'column', lg: 'row' }} sx={{ gap: '0 64px' }}>
            <div>{left}</div>

            <div>{right}</div>
        </Stack>
    )
}

export default PasswordContainer
