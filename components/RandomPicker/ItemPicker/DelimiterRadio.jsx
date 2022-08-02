import { delimiterRadios } from '../../../constants/randomPicker'

import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

const DelimiterRadio = ({ items, handleChange }) => {
    return (
        <div>
            <FormLabel>Input delimiter</FormLabel>
            <RadioGroup row defaultValue='newline' name='delimiter' value={items.delimiter} onChange={handleChange}>
                {delimiterRadios.map(({ value, label }, index) => (
                    <FormControlLabel key={index} value={value} control={<Radio />} label={label} />
                ))}
            </RadioGroup>
        </div>
    )
}

export default DelimiterRadio
