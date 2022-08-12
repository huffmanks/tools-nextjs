import { useEffect, useState } from 'react'

import { useLists } from '../../hooks/useContext'

import { uniqueId } from '../../utilities/uniqueId'
import { initialValues, initialErrors } from '../../constants/todoList'

export const useTodoListFormControls = () => {
    const uid = uniqueId()

    const { screen, activeListId, lists, changeScreen, addList, updateList } = useLists()

    const [list, setList] = useState(initialValues)
    const [items, setItems] = useState([])
    const [errors, setErrors] = useState(initialErrors)
    const [formIsValid, setFormIsValid] = useState(false)

    useEffect(() => {
        const initialList = lists.find((list) => list.id === activeListId)

        if (initialList && screen !== 'create') {
            setList(initialList)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const validate = (name, value) => {
        if (value.trim() === '') {
            setList({
                ...list,
                [name]: '',
            })

            setFormIsValid(false)

            return setErrors({
                title: name === 'title' ?? false,
                ...(screen === 'create' && {
                    tempItem: (name === 'tempItem' && !items?.length) ?? false,
                }),
            })
        }
        setErrors(initialErrors)

        if (!!list.title && list.items?.length > 0 && list.items.every((item) => item.text.length)) setFormIsValid(true)
    }

    const handleChange = (e) => {
        const { id, name, value, type, checked } = e.target

        validate(name, value)

        if (screen === 'edit' && id) {
            // if ((screen === 'edit' && id) || (screen === 'edit' && type === 'checkbox')) {
            // const update = type === 'checkbox' ? { completed: checked } : { text: value }

            // const updatedItems = [...list.items.map((item) => (item.id === id ? { ...item, ...update } : item))]
            const updatedItems = [...list.items.map((item) => (item.id === id ? { ...item, text: value } : item))]

            if (updatedItems.every((item) => item.text.length)) {
                setFormIsValid(true)
            }

            return setList({ ...list, items: updatedItems })
        }

        setList({
            ...list,
            [name]: value,
        })
    }

    const handleAddItem = (e) => {
        const { value } = e.target
        const { id } = e.currentTarget

        if ((e.key === 'Enter' && value !== '') || (id === 'addItemButton' && list.tempItem !== '')) {
            setItems([
                ...items,
                {
                    id: uid,
                    completed: false,
                    text: list.tempItem.trim(),
                },
            ])

            setList({
                ...list,
                tempItem: '',
            })

            if (!!list.title) return setFormIsValid(true)
        }
    }

    const handleAddInput = (e, index, itemsRef) => {
        const { id } = e.currentTarget

        if ((e.key === 'Enter' && index === list.items.length - 1) || id === 'addInput') {
            const addedItem = [
                ...list.items,
                {
                    id: uid,
                    completed: false,
                    text: '',
                },
            ]

            setList({
                ...list,
                items: addedItem,
            })

            setTimeout(() => {
                itemsRef.current.lastChild.firstChild.firstChild.focus()
            }, 1)
        }
    }

    const handleRemoveItem = (id) => {
        const updatedItems = list.items.filter((item) => item.id !== id)
        setList({ ...list, items: updatedItems })
        setFormIsValid(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (screen === 'create') {
            addList({ list, items })

            setList(initialValues)
            setItems([])
            setFormIsValid(false)
        } else {
            updateList(list.id, list)
        }

        changeScreen(e, 'view')
    }

    return {
        list,
        items,
        errors,
        formIsValid,
        handleChange,
        handleAddItem,
        handleAddInput,
        handleRemoveItem,
        handleSubmit,
    }
}
