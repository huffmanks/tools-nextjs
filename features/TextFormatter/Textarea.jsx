import { Grid, TextField, IconButton, InputAdornment } from '@mui/material'

import ClearIcon from '@mui/icons-material/Clear'

const Textarea = ({ output, handleChange, handleClear }) => {
    return (
        <>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    variant='filled'
                    label='Insert Text'
                    name='output'
                    value={output}
                    onFocus={(e) => e.target.select()}
                    onChange={handleChange}
                    multiline
                    minRows={1}
                    maxRows={2}
                    sx={{
                        '& textarea': {
                            overflow: 'hidden',
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: 1,
                                    transform: 'translateY(-50%)',
                                }}>
                                <IconButton aria-label='clear input' onClick={handleClear} edge='start'>
                                    <ClearIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
        </>
    )
}

export default Textarea
