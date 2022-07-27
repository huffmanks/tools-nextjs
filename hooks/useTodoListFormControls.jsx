import { useEffect, useState } from 'react'

import { uniqueId } from '../utilities/uniqueId'
import { initialValues, initialErrors } from '../constants/todoList'

export const useTodoListFormControls = () => {
    const listId = uniqueId()

    const [screen, setScreen] = useState(0)
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState(initialErrors)
    const [formIsValid, setFormIsValid] = useState(false)

    const [items, setItems] = useState([])
    const [lists, setLists] = useState([])

    const handleScreen = (_, newScreen) => {
        setScreen(newScreen)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        if (value === '') {
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
                    id: listId + values.item,
                    text: values.item,
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

        setLists([
            ...lists,
            {
                id: listId + values.title,
                title: values.title,
                items,
            },
        ])

        setValues(initialValues)
        setItems([])
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
        handleScreen,
        handleChange,
        handleAddItem,
        handleSubmit,
    }
}
