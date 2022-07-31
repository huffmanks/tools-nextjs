import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#1e1e1e',
            paper: '#1e1e1e',
            secondary: '#333333;',
            alt: '#404040',
            altSecondary: '#444444',
        },
        text: {
            primary: '#fefefe',
        },
        primary: {
            main: '#5b21b6',
        },
    },
    typography: {
        fontFamily: `'Montserrat', sans-serif`,
        h2: {
            marginBottom: 32,
            fontSize: '1.5rem',
            '@media (min-width:600px)': {
                fontSize: '2.15rem',
            },
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            xms: 415,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    components: {
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: '#fefefe',
                    },
                },
            },
        },
    },
})

export default theme
