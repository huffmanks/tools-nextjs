import { useState } from 'react'
import { useRouter } from 'next/router'

import { navItems } from '../../constants/routes'

import { styled, useTheme } from '@mui/material/styles'
import { Box, Toolbar, CssBaseline, Divider, IconButton, Container } from '@mui/material'

import MuiAppBar from '@mui/material/AppBar'
import MuiDrawer from '@mui/material/Drawer'

import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import AppBarLogo from './AppBarLogo'
import NavItem from './NavItem'

const drawerWidth = 240

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
})

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
})

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 2),
    ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}))

const Layout = ({ children }) => {
    const router = useRouter()
    const theme = useTheme()
    const [open, setOpen] = useState(false)

    const handleDrawerOpen = () => {
        setOpen((prev) => !prev)
    }

    return (
        <Box sx={{ paddingLeft: '57px' }}>
            <CssBaseline />
            <AppBar position='fixed' open={open}>
                <Toolbar sx={{ height: '64px' }}>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        onClick={handleDrawerOpen}
                        edge='start'
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}>
                        <MenuIcon />
                    </IconButton>

                    <AppBarLogo logoSize={38} textSize={24} open={open} />
                </Toolbar>
            </AppBar>
            <Drawer variant='permanent' open={open}>
                <DrawerHeader sx={{ height: '64px' }}>
                    <AppBarLogo logoSize={28} textSize={23} />

                    <IconButton aria-label='toggle menu' onClick={handleDrawerOpen}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>

                <Divider />

                {navItems.map((navItem, index) => (
                    <NavItem key={index} router={router} routes={navItem.routes} open={open} setOpen={setOpen} groupName={navItem?.groupName} />
                ))}
            </Drawer>
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    p: {
                        xs: 3,
                        md: 4,
                    },
                    ...(open && { paddingLeft: '212px' }),
                }}>
                <DrawerHeader sx={{ height: '64px' }} />
                <Container
                    sx={{
                        marginInline: 0,
                        paddingInline: {
                            xs: 0,
                            sm: 3,
                        },
                    }}>
                    <>{children}</>
                </Container>
            </Box>
        </Box>
    )
}

export default Layout
