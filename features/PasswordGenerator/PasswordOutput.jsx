import { useGlobalState } from '../../hooks/useContext'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'

import { FormGroup, IconButton, InputAdornment, TextField } from '@mui/material'

import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const PasswordOutput = ({ password, showPassword, handleShowPassword }) => {
    const { addToast } = useGlobalState()
    const [copy] = useCopyToClipboard()

    const handleCopy = async () => {
        const copySuccess = await copy(password)

        if (copySuccess) {
            addToast('Copied to clipboard!')
        }
    }

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
                            <IconButton aria-label='toggle password visibility' onClick={handleShowPassword} edge='start'>
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton aria-label='copy value to clipboard' onClick={handleCopy} edge='end'>
                                <ContentCopyIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </FormGroup>
    )
}

export default PasswordOutput
