import { useEffect, useState } from 'react'

import { useLists } from '../../hooks/useContext'

import { uniqueId } from '../../utilities/uniqueId'
import { initialValues, initialErrors } from '../../constants/todoList'

export const useTodoListFormControls = () => {
    const uid = uniqueId()
    const { screen, lists, activeListId, addList, updateList } = useLists()

    const [list, setList] = useState(initialValues)
    const [items, setItems] = useState([])
    const [errors, setErrors] = useState(initialErrors)
    const [formIsValid, setFormIsValid] = useState(false)

    useEffect(() => {
        const initialList = lists.find((list) => list.id === activeListId)

        if (initialList) {
            setList(initialList)
            setFormIsValid(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lists])

    const validate = (id, name, value) => {
        if (value.trim() === '') {
            setList({
                ...list,
                [name]: '',
            })

            return setErrors({
                title: name === 'title' ?? false,
                ...(screen === 'create' && {
                    tempItem: (name === 'tempItem' && !items?.length) ?? false,
                }),
                ...(screen === 'edit' && {
                    [id]: (!list.items[0].text.length && !list.items[1]) ?? false,
                }),
            })
        }

        setErrors(initialErrors)
        if (!!list.title && (items?.length > 0 || !!list?.items?.[0].text.length)) return setFormIsValid(true)
    }

    const handleChange = (e) => {
        const { id, name, value } = e.target

        validate(id, name, value)

        if (screen === 'edit' && name !== 'title') {
            const updatedItems = [...list.items.map((item) => (item.id === id ? { ...item, text: value } : item))]
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
                    text: list.tempItem.trim(),
                },
            ])

            setList({
                ...list,
                tempItem: '',
            })
        }
    }

    const handleAddInput = () => {
        const addedItem = [
            ...list.items,
            {
                id: uid,
                text: '',
            },
        ]

        setList({
            ...list,
            items: addedItem,
        })
    }

    const handleRemoveItem = (id) => {
        const updatedItems = list.items.filter((item) => item.id !== id)
        setList({ ...list, items: updatedItems })
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
