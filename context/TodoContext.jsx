import { createContext, useEffect, useState } from 'react'
import { useGlobalState } from '../hooks/useContext'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { uniqueId } from '../utilities/uniqueId'
import { getTimestamp } from '../utilities/getTimestamp'
import { LOCAL_STORAGE_KEY } from '../constants/todoList'

export const TodoStateContext = createContext()

const TodoStateProvider = ({ children }) => {
    const uid = uniqueId()
    const { addToast } = useGlobalState()
    const [copy] = useCopyToClipboard(true)

    const [screen, setScreen] = useState('')
    const [savedLists, setSavedLists] = useLocalStorage(LOCAL_STORAGE_KEY, [])
    const [lists, setLists] = useState(savedLists ?? [])
    const [activeListId, setActiveListId] = useState(null)

    const changeScreen = (_, newScreen) => {
        if (newScreen === 'create') {
            setActiveListId(null)
        }

        if (newScreen === 'edit' && activeListId === null) return

        setScreen(newScreen)
    }

    useEffect(() => {
        if (lists.length > 0) return setScreen('view')

        setScreen('create')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addList = ({ list, items }) => {
        if (!lists.some((item) => item.title === list.title.trim())) {
            const newList = {
                id: uid,
                createdAt: {
                    date: getTimestamp(),
                    time: getTimestamp('time'),
                },
                updatedAt: {
                    date: getTimestamp(),
                    time: getTimestamp('time'),
                },
                title: list.title.trim(),
                isFavorite: false,
                items,
            }

            setLists([...lists, newList])
            setSavedLists([...lists, newList])
        }
    }

    const setId = (id) => {
        setActiveListId(id)
    }

    const addListAsFavorite = (id) => {
        const updatedList = lists.map((list) => {
            if (list.id === id) {
                addToast(`${!list.isFavorite ? 'Added' : 'Removed'} as favorite!`)

                return {
                    ...list,
                    isFavorite: !list.isFavorite,
                }
            }
            return list
        })

        setLists(updatedList)
        setSavedLists(updatedList)
    }

    const copyList = async (ref) => {
        const copySuccess = await copy(ref.current)

        if (copySuccess) {
            addToast('Copied to clipboard!')
        }
    }

    const updateList = (id, changedList) => {
        const updatedList = [
            ...lists.map((list) =>
                list.id === id
                    ? {
                          ...changedList,
                          updatedAt: {
                              date: getTimestamp(),
                              time: getTimestamp('time'),
                          },
                      }
                    : list
            ),
        ]

        setLists(updatedList)
        setSavedLists(updatedList)

        addToast('Updated successfully!')
    }

    const removeList = (id) => {
        const updatedList = lists.filter((list) => list.id !== id)

        setLists(updatedList)
        setSavedLists(updatedList)

        addToast('Deleted successfully!')
    }

    const contextValue = {
        screen,
        lists,
        activeListId,
        changeScreen,
        addList,
        setId,
        addListAsFavorite,
        copyList,
        updateList,
        removeList,
    }

    return <TodoStateContext.Provider value={contextValue}>{children}</TodoStateContext.Provider>
}

export default TodoStateProvider
