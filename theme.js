import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#1e1e1e',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#fefefe',
        },
        primary: {
            main: '#8a6e4b;',
        },
        secondary: {
            main: '#333333;',
        },
    },
    typography: {
        fontFamily: `'Montserrat', sans-serif`,
        h3: {
            marginBottom: '2rem',
            textTransform: 'uppercase',
            fontSize: '1.5rem',
            fontWeight: 700,
            '@media (min-width:600px)': {
                fontSize: '2.5rem',
            },
        },
    },
})

export default theme
