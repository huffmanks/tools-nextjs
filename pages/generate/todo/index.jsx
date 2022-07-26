import { Typography } from '@mui/material'

import SEO from '../../../components/layout/SEO'
import PageTitle from '../../../components/layout/PageTitle'
import ListMenu from '../../../components/TodoList/ListMenu'

const TodoList = () => {
    return (
        <>
            <SEO
                description='Create a todo list.'
                title='Todo List'
                url='/generate/todo'
                //    imageUrl='/todo-list.png'
            />
            <PageTitle>Todo List</PageTitle>

            <Typography paragraph mb={5}>
                Create a todo list.
            </Typography>

            <ListMenu />
        </>
    )
}

export default TodoList
