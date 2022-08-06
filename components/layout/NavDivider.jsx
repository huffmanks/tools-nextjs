import { Box, Divider } from '@mui/material'

const NavDivider = ({ open, label }) => {
    return open ? (
        <Divider textAlign='left' sx={{ '&::before, &::after': { marginBottom: 3 } }}>
            <Box component='span' color='primary.light' sx={{ textTransform: 'uppercase' }}>
                {label}
            </Box>
        </Divider>
    ) : (
        <Divider />
    )
}

export default NavDivider
