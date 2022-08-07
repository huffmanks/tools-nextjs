import NoteAddIcon from '@mui/icons-material/NoteAdd'
import ViewListIcon from '@mui/icons-material/ViewList'

export const initialValues = {
    title: '',
    item: '',
}

export const initialErrors = {
    title: false,
    item: false,
}

export const navItems = [
    { label: 'Create', value: 'create', icon: <NoteAddIcon /> },
    { label: 'View', value: 'view', icon: <ViewListIcon /> },
]
