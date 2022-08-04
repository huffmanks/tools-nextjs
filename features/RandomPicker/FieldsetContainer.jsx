import { FormControl, FormHelperText, FormLabel } from '@mui/material'

const FieldsetContainer = ({ title, helperText, size, isFullWidth, children }) => {
    const styles = {
        control: {
            display: size === 'small' ? 'block' : 'initial',
            width: isFullWidth ? '100%' : 'auto',
            marginBottom: 3,
        },
        label: {
            marginBottom: size === 'small' ? 1 : 3,
        },
    }
    return (
        <>
            <FormControl component='fieldset' variant='standard' sx={styles?.control}>
                <FormLabel component='legend' sx={styles.label}>
                    {title}
                </FormLabel>
                {children}
                <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
        </>
    )
}

export default FieldsetContainer
