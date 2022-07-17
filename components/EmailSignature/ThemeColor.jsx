import { themeColorOptions } from '../../constants/emailSignature'
import { Grid, TextField, FormLabel, InputAdornment, MenuItem } from '@mui/material'

const ThemeColor = ({ values, handleFocus, handleChange }) => {
    return (
        <>
            <Grid item xs={12}>
                <FormLabel>Theme Color</FormLabel>
            </Grid>

            <Grid item xl={0.75} md={1} sm={1.75} xs={3}>
                <div style={{ width: '100%', height: '100%', backgroundColor: values.colorSymbol + values.themeColor + (values.hasEndSymbol ? ')' : ''), borderRadius: '4px' }}></div>
            </Grid>
            <Grid item xl={1.75} sm={2.5} xs={9}>
                <TextField fullWidth select label='Type' value={values?.colorType} name='colorType' onChange={handleChange}>
                    {themeColorOptions.map((option) => (
                        <MenuItem key={option.name} value={option.name}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xl={2.25} md={3} sm={4.75} xs={12}>
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
        </>
    )
}

export default ThemeColor
