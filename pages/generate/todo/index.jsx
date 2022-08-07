import { useGlobalState } from '../../../hooks/useContext'
import { useTodoListFormControls } from '../../../features/TodoList/useTodoListFormControls'
import { navItems } from '../../../constants/todoList'

import SEO from '../../../components/common/SEO'
import PageTitle from '../../../components/common/PageTitle'
import Skelly from '../../../components/common/Skelly'

import Create from '../../../features/TodoList/Create'
import View from '../../../features/TodoList/View'
import BottomMenu from '../../../components/layout/BottomMenu'
import SkellyGroup from '../../../components/common/SkellyGroup'

const TodoList = () => {
    const { screen, values, errors, formIsValid, items, lists, handleScreen, handleChange, handleAddItem, handleSubmit, handleFavorite, handleDelete } = useTodoListFormControls()

    return (
        <>
            <SEO description='Create a todo list.' title='Todo List' url='/generate/todo' imageUrl='/todo-list.png' />

            <PageTitle>Todo List</PageTitle>
            <BottomMenu screen={screen} handleScreen={handleScreen} navItems={navItems}>
                {screen === '' && (
                    <>
                        <Skelly type='text' />
                        <SkellyGroup skellyAmount={3} gapSize={3} />
                    </>
                )}

                {screen === 'view' && <View lists={lists} handleFavorite={handleFavorite} handleDelete={handleDelete} />}

                {screen === 'create' && (
                    <Create values={values} errors={errors} formIsValid={formIsValid} items={items} handleChange={handleChange} handleAddItem={handleAddItem} handleSubmit={handleSubmit} />
                )}
            </BottomMenu>
        </>
    )
}

export default TodoList
