import { FormControl, FormHelperText, FormLabel } from '@mui/material'

const FieldsetContainer = ({ title, helperText, size, children }) => {
    const styles =
        size === 'large'
            ? {
                  control: {
                      marginBottom: 3,
                  },
                  label: {
                      marginBottom: 3,
                  },
              }
            : size === 'medium'
            ? {
                  label: {
                      marginBottom: 3,
                  },
              }
            : {
                  control: {
                      display: 'block',
                  },
                  label: {
                      marginBottom: 1,
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
