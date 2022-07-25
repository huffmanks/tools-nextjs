import { Box } from '@mui/material'

export const TabPanel = ({ children, value, index }) => {
    return (
        <div role='tabpanel' hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`}>
            {value === index && (
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: {
                            xs: 'center',
                            sm: 'flex-start',
                        },
                        gap: '30px',
                        marginLeft: {
                            xs: 0,
                            sm: '40px',
                        },
                    }}>
                    {children}
                </Box>
            )}
        </div>
    )
}

export const a11yProps = (index) => {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    }
}
