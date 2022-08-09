import NoteAddIcon from '@mui/icons-material/NoteAdd'
import ViewListIcon from '@mui/icons-material/ViewList'
import EditIcon from '@mui/icons-material/Edit'

export const LOCAL_STORAGE_KEY = 'webtools-v1-todo-lists-saved'

export const initialValues = {
    title: '',
    tempItem: '',
}

export const initialErrors = {
    title: false,
    item: false,
}

export const navItems = [
    { label: 'Create', value: 'create', icon: <NoteAddIcon /> },
    { label: 'View', value: 'view', icon: <ViewListIcon /> },
    { label: 'Edit', value: 'edit', icon: <EditIcon /> },
]
