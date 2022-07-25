import { Box, Divider } from '@mui/material'

const NavDivider = ({ open, groupName }) => {
    return open ? (
        <Divider textAlign='left' sx={{ '&::before, &::after': { marginBottom: 3 } }}>
            <Box component='span' color='primary.light' sx={{ textTransform: 'uppercase' }}>
                {groupName}
            </Box>
        </Divider>
    ) : (
        <Divider />
    )
}

export default NavDivider
