import { FormGroup, IconButton, InputAdornment, TextField } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

import { generateKey } from '../../utilities/generateKey'

const RandomKeyGens = ({ handleCopy }) => {
    const keygen = generateKey()
    return (
        <>
            {keygen.map((key) => (
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
                                    <IconButton aria-label='copy value to clipboard' onClick={handleCopy} edge='end'>
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
