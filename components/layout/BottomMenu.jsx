import { useEffect, useRef } from 'react'

import { BottomNavigation, BottomNavigationAction, Box, CssBaseline, Paper } from '@mui/material'

const BottomMenu = ({ screen, handleScreen, navItems, children }) => {
    const ref = useRef(null)

    useEffect(() => {
        ref.current.ownerDocument.body.scrollTop = 0
    }, [screen])

    return (
        <Box sx={{ pb: 7 }} ref={ref}>
            <CssBaseline />

            {children}

            <Paper sx={{ position: 'fixed', bottom: 0, left: { xs: 57, sm: 65 }, right: 0, zIndex: 2 }} elevation={3}>
                <BottomNavigation value={screen} onChange={handleScreen}>
                    {navItems.map((item, i) => (
                        <BottomNavigationAction key={i} label={item.label} value={item.value} icon={item.icon} />
                    ))}
                </BottomNavigation>
            </Paper>
        </Box>
    )
}

export default BottomMenu
