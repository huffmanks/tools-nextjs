import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { directionRadios, trackTransparentRadios } from '../../constants/cssScrollbar'

const ScrollbarRadios = ({ radioGroup, groupLabel, ariaLabel, groupName, defaultValue, groupValue, handleChange }) => {
    const radioLists = { directionRadios, trackTransparentRadios }
    const radioArr = radioLists[radioGroup]
    return (
        <>
            <FormControl component='fieldset' sx={{ marginBottom: 3 }}>
                <FormLabel id={ariaLabel}>{groupLabel}</FormLabel>
                <RadioGroup row defaultValue={defaultValue} aria-labelledby={ariaLabel} name={groupName} value={groupValue} onChange={handleChange}>
                    {radioArr.map(({ value, label }, index) => (
                        <FormControlLabel
                            key={index}
                            value={value}
                            control={
                                <Radio
                                    sx={{
                                        '&.Mui-checked': {
                                            color: 'primary.main',
                                        },
                                    }}
                                />
                            }
                            label={label}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </>
    )
}

export default ScrollbarRadios
