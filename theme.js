import { createTheme } from '@mui/material/styles'

const globalTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#1e1e1e',
            paper: '#1e1e1e',
            alt: '#2c2c2c',
            altTwo: '#333333;',
            altThree: '#404040',
            altFour: '#444444',
        },
        text: {
            primary: '#fefefe',
        },
        primary: {
            main: '#5b21b6',
        },
        icon: {
            main: '#6214e1',
        },
    },
    typography: {
        fontFamily: `'Montserrat', sans-serif`,
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
})

const theme = createTheme({
    ...globalTheme,
    components: {
        MuiTypography: {
            styleOverrides: {
                h2: {
                    marginBottom: 32,
                    fontSize: 24,
                    [globalTheme.breakpoints.up('md')]: {
                        fontSize: '2.15rem',
                    },
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: globalTheme.palette.text.primary,
                    },
                },
            },
        },
        MuiSnackbar: {
            styleOverrides: {
                root: {
                    [globalTheme.breakpoints.up('xs')]: {
                        left: 'auto',
                        right: 24,
                    },
                },
            },
        },
    },
})

export default theme
