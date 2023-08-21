import { useGlobalState } from '../../hooks/useContext'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'

import { FormGroup, IconButton, InputAdornment, TextField } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const RandomKeyGens = ({ values }) => {
    const { addToast } = useGlobalState()
    const [copy] = useCopyToClipboard()

    const handleCopy = async (key) => {
        const copySuccess = await copy(key)

        if (copySuccess) {
            addToast('Copied to clipboard!')
        }
    }

    return (
        <>
            {values.keygen.map((key) => (
                <FormGroup key={key}>
                    <TextField
                        focused
                        variant='outlined'
                        type='text'
                        value={key}
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

                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton aria-label='copy value to clipboard' onClick={() => handleCopy(key)} edge='end'>
                                        <ContentCopyIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormGroup>
            ))}
        </>
    )
}

export default RandomKeyGens
