import { Box, Divider, Typography } from '@mui/material'

const AppBarLogo = ({ logoSize, textSize, open, isForMobile }) => {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: isForMobile ? 2 : 3,
                    '@media (min-width:600px)': {
                        ...(isForMobile && { display: 'none' }),
                    },
                    '@media (max-width:599px)': {
                        ...(open === true && { display: 'none' }),
                    },
                }}>
                <Box
                    sx={{
                        width: logoSize,
                        height: logoSize,
                        '@media (max-width:599px)': {
                            width: logoSize * 0.85,
                            height: logoSize * 0.85,
                        },
                        '@media (max-width:400px)': {
                            width: logoSize * 0.75,
                            height: logoSize * 0.75,
                        },
                    }}>
                    <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='#5b21b6'>
                        <path d='M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z' />
                    </svg>
                </Box>
                <Divider orientation='vertical' flexItem sx={{ borderRightWidth: isForMobile ? 1 : 2, borderRightColor: '#cccccc' }} />
                <Typography
                    fontFamily={`'Lato', sans-serif`}
                    fontWeight={700}
                    lineHeight={1}
                    letterSpacing={2}
                    sx={{
                        paddingBottom: '5px',
                        fontSize: textSize,
                        '@media (max-width:599px)': {
                            paddingBottom: '3px',
                            fontSize: textSize * 0.8,
                        },
                    }}>
                    stratools
                </Typography>
            </Box>
        </>
    )
}

export default AppBarLogo
