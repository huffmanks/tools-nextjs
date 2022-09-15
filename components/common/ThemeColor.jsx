import { themeColorOptions } from '../../constants/themeColorOptions'
import { Grid, TextField, InputAdornment, MenuItem, Typography } from '@mui/material'

const ThemeColor = ({ values, handleFocus, handleChange }) => {
    return (
        <Grid container spacing={2} sx={{ marginBottom: 1 }}>
            <Grid item xs={12}>
                <Typography variant='subtitle1'>Theme Color</Typography>
            </Grid>

            <Grid item>
                <div style={{ width: '56px', height: '56px', backgroundColor: values.colorSymbol + values.themeColor + (values.hasEndSymbol ? ')' : ''), borderRadius: '4px' }}></div>
            </Grid>
            <Grid item>
                <TextField fullWidth select label='Type' value={values?.colorType} name='colorType' onChange={handleChange} sx={{ width: 100 }}>
                    {themeColorOptions.map((option) => (
                        <MenuItem key={option.name} value={option.name}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item>
                <TextField
                    fullWidth
                    variant='outlined'
                    label='Color'
                    placeholder={values.placeholder}
                    name='themeColor'
                    value={values.themeColor}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: <InputAdornment position='start'>{values.colorSymbol}</InputAdornment>,
                        endAdornment: (values.colorType === 'rgb' || values.colorType === 'hsl') && <InputAdornment position='end'>)</InputAdornment>,
                    }}
                />
            </Grid>
        </Grid>
    )
}

export default ThemeColor
