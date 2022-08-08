import { useEffect, useState } from 'react'

import { useLists } from '../../hooks/useContext'

import { uniqueId } from '../../utilities/uniqueId'
import { initialErrors } from '../../constants/todoList'

export const useTodoListFormControls = (initialValues) => {
    const uid = uniqueId()
    const { addList } = useLists()

    const [list, setList] = useState(initialValues)
    const [items, setItems] = useState([])
    const [isFocused, setIsFocused] = useState(false)
    const [errors, setErrors] = useState(initialErrors)
    const [formIsValid, setFormIsValid] = useState(false)

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleBlur = (e) => {
        setIsFocused(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        if (value.trim() === '') {
            setList({
                ...list,
                [name]: '',
            })
            return setErrors({
                title: name === 'title' ?? false,
                item: (name === 'item' && !items?.length) ?? false,
            })
        }

        setList({
            ...list,
            [name]: value,
        })

        setErrors(initialErrors)
    }

    const handleAddItem = (e) => {
        const { value } = e.target
        const { id } = e.currentTarget

        if ((e.key === 'Enter' && value !== '') || (id === 'addItemButton' && list.item !== '')) {
            setItems([
                ...items,
                {
                    id: uid,
                    text: list.item.trim(),
                },
            ])

            setList({
                ...list,
                item: '',
            })
        }
    }

    const handleRemoveItem = (id) => {
        const updatedItems = list.items.filter((item) => item.id !== id)
        setList({ ...list, items: updatedItems })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        addList({ list, items })

        setList(initialValues)
        setItems([])
        setFormIsValid(false)
    }

    useEffect(() => {
        if (list.title && items.length > 0) return setFormIsValid(true)
    }, [list.title, items])

    return {
        list,
        items,
        isFocused,
        errors,
        formIsValid,
        handleFocus,
        handleChange,
        handleBlur,
        handleAddItem,
        handleRemoveItem,
        handleSubmit,
    }
}
