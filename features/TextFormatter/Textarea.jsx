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
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
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
