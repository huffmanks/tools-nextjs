import { FormGroup, IconButton, InputAdornment, TextField } from '@mui/material'

import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const Password = ({ password, showPassword, setShowPassword }) => {
    return (
        <FormGroup>
            <TextField
                focused
                variant='outlined'
                label='Password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                autoComplete='none'
                sx={{
                    maxWidth: '100%',
                    width: 500,
                    marginBottom: 5,
                    '& input': {
                        fontFamily: '"Roboto Mono", monospace',
                        letterSpacing: {
                            xs: 2,
                            sm: 3,
                        },
                        fontSize: 18,
                    },
                }}
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <InputAdornment position='start'>
                            <IconButton aria-label='toggle password visibility' onClick={() => setShowPassword((prev) => !prev)} edge='start'>
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton aria-label='copy value to clipboard' onClick={() => navigator.clipboard.writeText(password)} edge='end'>
                                <ContentCopyIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </FormGroup>
    )
}

export default Password
