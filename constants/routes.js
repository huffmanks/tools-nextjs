import HomeIcon from '@mui/icons-material/Home'
import AspectRatioIcon from '@mui/icons-material/AspectRatio'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import ScaleIcon from '@mui/icons-material/Scale'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import KeyIcon from '@mui/icons-material/Key'

export const routes = [
    {
        path: '/',
        name: 'Home',
        key: 'home',
        icon: <HomeIcon />,
        description: 'Web dev tools.',
    },
    {
        path: '/aspect-ratio',
        name: 'Aspect Ratio',
        key: 'aspect-ratio',
        icon: <AspectRatioIcon />,
        description: 'Calculate the aspect ratio.',
    },
    {
        path: '/color-picker',
        name: 'Color Picker',
        key: 'color-picker',
        icon: <ColorLensIcon />,
        description: 'Choose a color in HEX, RGB or HSL.',
    },
    {
        path: '/text-formatter',
        name: 'Text Formatter',
        key: 'text-formatter',
        icon: <TextFieldsIcon />,
        description: 'Format text to any case.',
    },
    {
        path: '/unit-converter',
        name: 'Unit Converter',
        key: 'unit-converter',
        icon: <ScaleIcon />,
        description: 'Convert different unit types.',
    },
    {
        path: '/email-signature',
        name: 'Email Signature',
        key: 'email-signature',
        icon: <DesignServicesIcon />,
        description: 'Create an email signature.',
    },
    {
        path: '/password-generator',
        name: 'Password Generator',
        key: 'password-generator',
        icon: <KeyIcon />,
        description: 'Create a strong password.',
    },
]
