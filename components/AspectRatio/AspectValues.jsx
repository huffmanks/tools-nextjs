import { useGlobalState } from '../../hooks/useGlobalState'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { aspectOutput } from '../../constants/aspectRatio'

import { Grid, TextField, InputAdornment, IconButton } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const AspectValues = ({ values }) => {
    const { addToast } = useGlobalState()
    const [copy] = useCopyToClipboard()

    const handleCopy = async (name) => {
        const copySuccess = await copy(name)

        if (copySuccess) {
            addToast('Copied to clipboard!')
        }
    }

    return (
        <>
            {aspectOutput.map((output, index) => (
                <Grid key={index} item sm={6} xs={12}>
                    <TextField
                        fullWidth
                        focused
                        readOnly
                        variant='outlined'
                        label={output.label}
                        name={output.name}
                        placeholder={output.placeholder}
                        value={values[output.name]}
                        autoComplete='none'
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <InputAdornment position='end'>
                                    {values[output.name] && (
                                        <IconButton aria-label='copy value to clipboard' onClick={() => handleCopy(values[output.name])} edge='end'>
                                            <ContentCopyIcon />
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            ))}
        </>
    )
}

export default AspectValues
