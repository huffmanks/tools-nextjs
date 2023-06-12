import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import { firefoxWidthSelect, borderStyleSelect } from '../../constants/cssScrollbar'

const ScrollbarSelect = ({ selectGroup, groupLabel, ariaLabel, groupName, defaultValue, groupValue, handleChange }) => {
    const selectLists = { firefoxWidthSelect, borderStyleSelect }
    const selectArr = selectLists[selectGroup]

    return (
        <>
            <FormControl sx={{ width: '100%' }}>
                <InputLabel id={ariaLabel}>{groupLabel}</InputLabel>
                <Select labelId={ariaLabel} name={groupName} defaultValue={defaultValue} value={groupValue} label={groupLabel} onChange={handleChange}>
                    {selectArr.map(({ value, label }, index) => (
                        <MenuItem key={index} value={value}>
                            {label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}

export default ScrollbarSelect
