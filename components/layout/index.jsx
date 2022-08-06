import { useState } from 'react'
import { useRouter } from 'next/router'

import { mainRoutes, navItems } from '../../constants/routes'

import { styled, useTheme } from '@mui/material/styles'
import { Box, Toolbar, CssBaseline, IconButton, Container } from '@mui/material'

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
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 2),
    ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
    backgroundImage: 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
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
        <Box
            sx={{
                minHeight: '100vh',
                paddingTop: '65px',
                paddingLeft: {
                    xs: '57px',
                    sm: '65px',
                    md: open ? '240px' : '65px',
                },
            }}>
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
                <DrawerHeader>
                    <AppBarLogo logoSize={28} textSize={23} />

                    <IconButton aria-label='toggle menu' onClick={handleDrawerOpen}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>

                <NavItem router={router} routes={mainRoutes} open={open} setOpen={setOpen} label={mainRoutes[0].name} isHomePage />

                {navItems.map((navItem, index) => (
                    <NavItem key={index} router={router} routes={navItem.routes} open={open} setOpen={setOpen} label={navItem.label} />
                ))}
            </Drawer>
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                }}>
                <Container
                    sx={{
                        minHeight: 'calc(100vh - 65px)',
                        marginInline: 0,
                        padding: {
                            xs: 3,
                            sm: 4,
                            md: 5,
                        },
                    }}>
                    <>{children}</>
                </Container>
            </Box>
        </Box>
    )
}

export default Layout
