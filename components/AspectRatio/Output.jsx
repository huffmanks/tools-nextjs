import { aspectOutput } from '../../constants/aspectRatio'

import { Box, Grid, Chip, TextField, InputAdornment, IconButton, Stack } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const Output = ({ values }) => {
    const dimensions =
        values.originalWidth && values.originalHeight && values.selectedType === 'width'
            ? `${values.originalWidth} x ${values.originalHeight}`
            : values.originalWidth && values.originalHeight && values.selectedType === 'height'
            ? `${values.originalHeight} x ${values.originalWidth}`
            : '1920 x 1080'

    return (
        <Grid item container spacing={2} md={6}>
            <Grid item xs={12}>
                <Chip label='Output' color='primary' component='div' sx={{ marginBottom: '2rem' }} />
            </Grid>

            {aspectOutput.map((output, index) => (
                <Grid key={index} item sm={6} xs={12}>
                    <TextField
                        fullWidth
                        focused
                        readOnly
                        variant='outlined'
                        label={output.label}
                        name={output.name}
                        value={values[output.name]}
                        autoComplete='none'
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton aria-label='copy value to clipboard' onClick={() => navigator.clipboard.writeText(values[output.name])} edge='end'>
                                        <ContentCopyIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            ))}

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
                        backgroundColor: 'secondary.main',
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
        </Grid>
    )
}

export default Output
