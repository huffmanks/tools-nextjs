import { useEffect, useRef } from 'react'

import { useTodoListFormControls } from '../../../helpers/TodoList/useTodoListFormControls'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import CssBaseline from '@mui/material/CssBaseline'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

import CreateIcon from '@mui/icons-material/Create'
import ViewListIcon from '@mui/icons-material/ViewList'

import SEO from '../../../components/common/SEO'
import PageTitle from '../../../components/common/PageTitle'

import Create from '../../../features/TodoList/Create'
import View from '../../../features/TodoList/View'

const TodoList = () => {
    const ref = useRef(null)

    const { screen, values, errors, formIsValid, items, lists, handleScreen, handleChange, handleAddItem, handleSubmit, handleFavorite, handleDelete } = useTodoListFormControls()

    useEffect(() => {
        ref.current.ownerDocument.body.scrollTop = 0
    }, [screen])
    return (
        <>
            <SEO description='Create a todo list.' title='Todo List' url='/generate/todo' imageUrl='/todo-list.png' />

            <PageTitle>Todo List</PageTitle>

            <Box sx={{ pb: 7 }} ref={ref}>
                <CssBaseline />
                {screen === 1 ? (
                    <View lists={lists} handleFavorite={handleFavorite} handleDelete={handleDelete} />
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
        </>
    )
}

export default TodoList
