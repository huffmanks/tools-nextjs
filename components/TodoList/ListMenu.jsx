import { useEffect, useRef } from 'react'

import { useTodoListFormControls } from '../../hooks/useTodoListFormControls'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import CssBaseline from '@mui/material/CssBaseline'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

import CreateIcon from '@mui/icons-material/Create'
import ViewListIcon from '@mui/icons-material/ViewList'

import Create from './Create'
import View from './View'

const ListMenu = () => {
    const ref = useRef(null)

    const { screen, values, errors, formIsValid, items, lists, handleScreen, handleChange, handleAddItem, handleSubmit } = useTodoListFormControls()

    useEffect(() => {
        ref.current.ownerDocument.body.scrollTop = 0
    }, [screen])

    return (
        <Box sx={{ pb: 7 }} ref={ref}>
            <CssBaseline />
            {screen === 1 ? (
                <View lists={lists} />
            ) : (
                <Create values={values} errors={errors} formIsValid={formIsValid} items={items} handleChange={handleChange} handleAddItem={handleAddItem} handleSubmit={handleSubmit} />
            )}

            <Paper sx={{ position: 'fixed', bottom: 0, left: { xs: 56, sm: 64 }, right: 0, zIndex: 2 }} elevation={3}>
                <BottomNavigation showLabels value={screen} onChange={handleScreen}>
                    <BottomNavigationAction label='Create' icon={<CreateIcon />} />
                    <BottomNavigationAction label='View' icon={<ViewListIcon />} />
                </BottomNavigation>
            </Paper>
        </Box>
    )
}

export default ListMenu
