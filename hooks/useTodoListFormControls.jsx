import { useEffect, useState } from 'react'

import { useGlobalState } from './useGlobalState'
import { useLocalStorage } from './useLocalStorage'
import { uniqueId } from '../utilities/uniqueId'
import { initialValues, initialErrors } from '../constants/todoList'

export const useTodoListFormControls = () => {
    const listId = uniqueId()

    const [saved, setSaved] = useLocalStorage('webtools-v1-todo-lists-saved', [])
    const [lists, setLists] = useState(saved ?? [])

    const [screen, setScreen] = useState(0)
    const [values, setValues] = useState(initialValues)
    const [items, setItems] = useState([])
    const [errors, setErrors] = useState(initialErrors)
    const [formIsValid, setFormIsValid] = useState(false)

    const [listModal, setListModal] = useState(false)
    const { addToast } = useGlobalState()

    useEffect(() => {
        if (saved?.length) {
            setScreen(1)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleScreen = (_, newScreen) => {
        setScreen(newScreen)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        if (value.trim() === '') {
            setValues({
                ...values,
                [name]: '',
            })
            return setErrors({
                title: name === 'title' ? true : false,
                item: name === 'item' && !items?.length ? true : false,
            })
        }

        setValues({
            ...values,
            [name]: value,
        })

        setErrors(initialErrors)
    }

    const handleAddItem = (e) => {
        const { value } = e.target
        const { id } = e.currentTarget

        if ((e.key === 'Enter' && value !== '') || (id === 'addItemButton' && values.item !== '')) {
            setItems([
                ...items,
                {
                    id: listId,
                    text: values.item.trim(),
                },
            ])

            setValues({
                ...values,
                item: '',
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!saved.some((item) => item.title === values.title.trim())) {
            const update = {
                id: listId,
                title: values.title.trim(),
                isFavorite: false,
                items,
            }

            setLists([...lists, update])

            setSaved([...saved, update])
        }

        setValues(initialValues)
        setItems([])
        setFormIsValid(false)
    }

    const handleOpenModal = () => {
        setListModal(true)
    }

    const handleCloseModal = () => {
        setListModal(false)
    }

    const handleDelete = (list) => {
        const newList = saved.filter((item) => item.id !== list.id)

        setListModal(false)

        setLists([...newList])
        setSaved([...newList])

        // setLists((prev) => [prev.filter((item) => item.id !== list.id)])
        // setSaved((prev) => [prev.filter((item) => item.id !== list.id)])

        addToast(`${list.title} deleted successfully!`)
    }

    useEffect(() => {
        if (values.title && items?.length) return setFormIsValid(true)
    }, [values.title, items])

    return {
        screen,
        values,
        errors,
        formIsValid,
        items,
        lists,
        listModal,
        handleScreen,
        handleChange,
        handleAddItem,
        handleSubmit,
        handleOpenModal,
        handleCloseModal,
        handleDelete,
    }
}
