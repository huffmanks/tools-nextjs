import { Box, Button, Typography } from '@mui/material'

const ErrorTitle = ({ errorCode, errorMessage, errorFontSize, buttonText, buttonAction }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 4,
            }}>
            <Typography
                variant='h2'
                component='h1'
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    flexDirection: {
                        xs: 'column',
                        md: 'row',
                    },
                    fontSize: {
                        xs: errorFontSize - 10,
                        sm: errorFontSize,
                        md: errorFontSize + 10,
                    },
                }}>
                {errorCode && (
                    <>
                        <span>{errorCode}</span>
                        <Box
                            component='span'
                            sx={{
                                display: {
                                    xs: 'none',
                                    md: 'inline-block',
                                },
                            }}>
                            |
                        </Box>
                    </>
                )}
                <span>{errorMessage}</span>
            </Typography>

            <Button variant='contained' size='large' aria-label='Go back' onClick={buttonAction}>
                {buttonText}
            </Button>
        </Box>
    )
}

export default ErrorTitle
