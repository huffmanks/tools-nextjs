import { Box, Typography } from '@mui/material'
import SvgIcon from '@mui/material/SvgIcon'

const AppBarLogo = ({ logoSize, textSize, open }) => {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    '@media (min-width:600px)': {
                        ...(open && { display: 'none' }),
                    },
                    '@media (max-width:599px)': {
                        ...(open === true && { display: 'none' }),
                    },
                }}>
                <Box
                    sx={{
                        width: logoSize,
                        height: logoSize,
                    }}>
                    <SvgIcon
                        viewBox='0 0 20 20'
                        color='icon'
                        sx={{
                            width: logoSize,
                            height: logoSize,
                        }}>
                        <path d='M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z' />
                    </SvgIcon>
                </Box>

                <Typography
                    fontFamily={`'Lato', sans-serif`}
                    fontWeight={700}
                    letterSpacing={2}
                    sx={{
                        paddingBottom: '5px',
                        fontSize: textSize,
                    }}>
                    stratools
                </Typography>
            </Box>
        </>
    )
}

export default AppBarLogo
