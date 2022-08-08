import TodoStateProvider from '../../../context/TodoContext'

import SEO from '../../../components/common/SEO'
import PageTitle from '../../../components/common/PageTitle'
import Screens from '../../../features/TodoList/Screens'

const TodoList = () => {
    return (
        <TodoStateProvider>
            <SEO description='Create a todo list.' title='Todo List' url='/generate/todo' imageUrl='/todo-list.png' />

            <PageTitle>Todo List</PageTitle>

            <Screens />
        </TodoStateProvider>
    )
}

export default TodoList
