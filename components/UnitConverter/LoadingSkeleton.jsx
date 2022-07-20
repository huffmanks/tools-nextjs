import { Box, Skeleton } from '@mui/material'
import InputContainer from './InputContainer'

const Skelly = () => {
    return (
        <div>
            <Skeleton variant='rectangular' width='100%' height={56} />
        </div>
    )
}

const BoxItem = () => {
    return (
        <Box
            sx={{
                maxWidth: {
                    xs: '100%',
                    md: '36.2%',
                },
                flexBasis: {
                    xs: '100%',
                    md: '36.2%',
                },
            }}>
            <Skelly />
        </Box>
    )
}

const LoadingSkeleton = () => {
    return (
        <>
            <InputContainer top={<Skelly />} center={<Skelly />} bottom={<Skelly />} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                <BoxItem />
                <BoxItem />
                <BoxItem />
                <BoxItem />
            </Box>
        </>
    )
}

export default LoadingSkeleton
