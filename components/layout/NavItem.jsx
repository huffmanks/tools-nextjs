import Link from 'next/link'

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

import NavDivider from './NavDivider'

const NavItem = ({ router, routes, open, setOpen, label, isHomePage }) => {
    return (
        <>
            {!isHomePage && <NavDivider open={open} label={label} />}
            <List>
                {routes.map(({ key, path, name, icon }) => (
                    <ListItem key={key} disablePadding sx={{ display: 'block' }}>
                        <Link href={path} passHref={true} style={{ textDecoration: 'none' }}>
                            <ListItemButton
                                selected={router.pathname === path ? true : false}
                                onClick={() => setOpen(false)}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}>
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 2 : 'auto',
                                        justifyContent: 'center',
                                    }}>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={name}
                                    sx={{
                                        color: '#fff',
                                        opacity: open ? 1 : 0,
                                        '& .MuiListItemText-primary': {
                                            fontSize: '15px',
                                        },
                                    }}
                                />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default NavItem
