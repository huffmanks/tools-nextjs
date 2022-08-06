import { Skeleton } from '@mui/material'

const Skelly = ({ type }) => {
    const styles = {
        text: {
            width: 250,
            height: 20,
            marginBottom: 3,
            borderRadius: 4,
        },
        input: {
            width: '100%',
            height: 56,
            borderRadius: 1,
        },
    }

    return <Skeleton animation='wave' variant='rectangular' sx={styles[type]} />
}

export default Skelly
