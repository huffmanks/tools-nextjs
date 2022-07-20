import { MenuItem, TextField } from '@mui/material'

const UnitSelect = ({ selectLabel, selectName, selectValue, changeHandler, unitList }) => {
    return (
        <>
            <TextField
                fullWidth
                select
                label={selectLabel}
                name={selectName}
                value={selectValue}
                onChange={changeHandler}
                sx={{
                    '& fieldset': {
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: {
                            xs: 0,
                            md: 4,
                        },
                        borderBottomLeftRadius: {
                            xs: 4,
                            md: 0,
                        },
                    },
                }}>
                {unitList.map((option) => (
                    <MenuItem key={option.id} value={option.unit}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </>
    )
}

export default UnitSelect
