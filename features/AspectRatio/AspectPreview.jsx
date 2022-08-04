import { Box, Grid, Stack } from '@mui/material'

const AspectPreview = ({ values }) => {
    const dimensions = values?.dimensions ?? ''

    return (
        <>
            <Grid item xs={12}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minWidth: '125px',
                        maxWidth: '100%',
                        minHeight: '50px',
                        maxHeight: '400px',
                        margin: '0 auto',
                        aspectRatio: values.aspectMultiplier !== '' ? values.aspectMultiplier : '1920 / 1080',
                        backgroundColor: 'background.secondary',
                        borderRadius: '4px',
                    }}>
                    <Stack spacing={1} justifyContent='center' alignItems='center'>
                        <Stack direction='row' justifyContent='center' alignItems='center' spacing={2}>
                            {dimensions}
                        </Stack>
                        <Stack direction='row' justifyContent='center' alignItems='center' spacing={2}>
                            {values.aspectRatio !== '' ? values.aspectRatio : '16:9'}
                        </Stack>
                    </Stack>
                </Box>
            </Grid>
        </>
    )
}

export default AspectPreview
