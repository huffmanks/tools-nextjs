import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

const ListType = ({ list, handleChange }) => {
    return (
        <FormControl sx={{ mb: 3 }}>
            <FormLabel id='demo-row-radio-buttons-group-label'>List type</FormLabel>

            <RadioGroup row name='type' value={list.type} onChange={handleChange}>
                <FormControlLabel value='task' control={<Radio color='primary' />} label='Task' />

                <FormControlLabel value='shopping' control={<Radio color='primary' />} label='Shopping' />
            </RadioGroup>
        </FormControl>
    )
}

export default ListType
