import AspectRatioIcon from '@mui/icons-material/AspectRatio'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import HomeIcon from '@mui/icons-material/Home'
import KeyIcon from '@mui/icons-material/Key'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import ScaleIcon from '@mui/icons-material/Scale'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import TextFieldsIcon from '@mui/icons-material/TextFields'

export const mainRoutes = [
    {
        path: '/',
        name: 'Home',
        key: 'home',
        icon: <HomeIcon />,
        description: 'Web dev tools.',
    },
]

export const calculateRoutes = [
    {
        path: '/calculate/aspect-ratio',
        name: 'Aspect Ratio',
        homeName: 'Aspect Ratio',
        key: 'aspect-ratio',
        icon: <AspectRatioIcon />,
        description: 'Calculate the aspect ratio.',
    },
    {
        path: '/calculate/units',
        name: 'Units',
        homeName: 'Unit Calculator',
        key: 'unit-calculator',
        icon: <ScaleIcon />,
        description: 'Calculate different unit types.',
    },
]

export const formatRoutes = [
    {
        path: '/format/text',
        name: 'Text',
        homeName: 'Text Formatter',
        key: 'text-formatter',
        icon: <TextFieldsIcon />,
        description: 'Format text to any case.',
    },
]

export const generateRoutes = [
    {
        path: '/generate/email-signature',
        name: 'Email Signature',
        homeName: 'Email Signature',
        key: 'email-signature',
        icon: <DesignServicesIcon />,
        description: 'Create an email signature.',
    },
    {
        path: '/generate/password',
        name: 'Password',
        homeName: 'Password Generator',
        key: 'password-generator',
        icon: <KeyIcon />,
        description: 'Create a strong password.',
    },
    {
        path: '/generate/todo',
        name: 'Todo List',
        homeName: 'Todo List',
        key: 'todo-list',
        icon: <PlaylistAddIcon />,
        description: 'Create a todo list.',
    },
]

export const pickerRoutes = [
    {
        path: '/picker/color',
        name: 'Color',
        homeName: 'Color Picker',
        key: 'color-picker',
        icon: <ColorLensIcon />,
        description: 'Choose a color in HEX, RGB or HSL.',
    },
    {
        path: '/picker/random',
        name: 'Random',
        homeName: 'Random Picker',
        key: 'random-picker',
        icon: <ShuffleIcon />,
        description: 'Get a random number or item.',
    },
]

export const allRoutes = [...calculateRoutes, ...formatRoutes, ...generateRoutes, ...pickerRoutes]
