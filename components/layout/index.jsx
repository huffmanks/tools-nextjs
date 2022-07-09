import { useState } from 'react'
import Link from 'next/link'

import { styled, useTheme } from '@mui/material/styles'
import { Box, Toolbar, List, CssBaseline, Typography, Divider, ListItem, ListItemIcon, ListItemText, ListItemButton, IconButton, Container } from '@mui/material'

import MuiAppBar from '@mui/material/AppBar'
import MuiDrawer from '@mui/material/Drawer'

import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import { routes } from '../../constants/routes'

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
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
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

// AppBar.muiName = MuiAppBar.muiName

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

// ListItem.MuiName = 'MuiListItem'

const Layout = ({ children }) => {
    const theme = useTheme()
    const [open, setOpen] = useState(false)

    const handleDrawerOpen = () => {
        setOpen((prev) => !prev)
    }

    return (
        <Box sx={{ paddingLeft: '57px' }}>
            <CssBaseline />
            <AppBar position='fixed' open={open}>
                <Toolbar>
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
                    <Typography variant='h6' noWrap component='div'>
                        Web Tools
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant='permanent' open={open}>
                <DrawerHeader>
                    <IconButton aria-label='toggle menu' onClick={handleDrawerOpen}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {routes.slice(0, 1).map(({ key, path, name, icon }) => (
                        <ListItem key={key}>
                            <Link href={path} passHref={true} style={{ textDecoration: 'none' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={name} sx={{ color: '#fff', opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {routes.slice(1, -1).map(({ key, path, name, icon }) => (
                        <ListItem key={key}>
                            <Link href={path} passHref={true} style={{ textDecoration: 'none' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={name} sx={{ color: '#fff', opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {routes.slice(-1).map(({ key, path, name, icon }) => (
                        <ListItem key={key}>
                            <Link href={path} passHref={true} style={{ textDecoration: 'none' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={name} sx={{ color: '#fff', opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    p: 4,
                    ...(open && { paddingLeft: '212px' }),
                    '@media (max-width: 600px)': {
                        p: 3,
                    },
                }}>
                <DrawerHeader />
                <Container disableGutters={true}>
                    <>{children}</>
                </Container>
            </Box>
        </Box>
    )
}

export default Layout
