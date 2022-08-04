import { Box, Button, Typography } from '@mui/material'

const ErrorTitle = ({ errorCode, errorMessage, errorFontSize, buttonText, buttonAction, isFallback }) => {
    const fontStyle = {
        xs: isFallback ? 20 : errorFontSize - 10,
        sm: isFallback ? 20 : errorFontSize,
        md: isFallback ? 20 : errorFontSize + 10,
    }

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
                    fontSize: fontStyle,
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

            {!isFallback && (
                <Button variant='contained' size='large' aria-label='Go back' onClick={buttonAction}>
                    {buttonText}
                </Button>
            )}
        </Box>
    )
}

export default ErrorTitle
