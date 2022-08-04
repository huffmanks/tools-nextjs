import { Typography } from '@mui/material'

const PageTitle = ({ children }) => {
    return (
        <Typography variant='h2' component='h1'>
            {children}
        </Typography>
    )
}

export default PageTitle
