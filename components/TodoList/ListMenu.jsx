import { useEffect, useId, useRef, useState } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import CssBaseline from '@mui/material/CssBaseline'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

import CreateIcon from '@mui/icons-material/Create'
import ViewListIcon from '@mui/icons-material/ViewList'

import Create from './Create'
import View from './View'

export default function FixedBottomNavigation() {
    const ref = useRef(null)
    const id = useId()

    const [screen, setScreen] = useState(0)
    const [title, setTitle] = useState('')
    const [item, setItem] = useState('')
    const [items, setItems] = useState([])
    const [lists, setLists] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === 'title') return setTitle(value)

        if (name === 'item') return setItem(value)
    }

    const handleAddItem = () => {
        setItems([
            ...items,
            {
                id: id + item,
                text: item,
            },
        ])

        setItem('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setLists([
            ...lists,
            {
                id: id + title,
                title,
                items,
            },
        ])

        setTitle('')
        setItem('')
        setItems([])
    }

    useEffect(() => {
        ref.current.ownerDocument.body.scrollTop = 0
    }, [screen])

    return (
        <Box sx={{ pb: 7 }} ref={ref}>
            <CssBaseline />
            {screen === 1 ? <View lists={lists} /> : <Create title={title} item={item} items={items} handleChange={handleChange} handleAddItem={handleAddItem} handleSubmit={handleSubmit} />}

            <Paper sx={{ position: 'fixed', bottom: 0, left: { xs: 56, sm: 64 }, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={screen}
                    onChange={(_, newScreen) => {
                        setScreen(newScreen)
                    }}>
                    <BottomNavigationAction label='Create' icon={<CreateIcon />} />
                    <BottomNavigationAction label='View' icon={<ViewListIcon />} />
                </BottomNavigation>
            </Paper>
        </Box>
    )
}
