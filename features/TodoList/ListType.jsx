import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

const ListType = ({ list, handleChange }) => {
    return (
        <FormControl sx={{ mb: 3 }}>
            <FormLabel>List type</FormLabel>

            <RadioGroup row name='type' value={list.type} onChange={handleChange}>
                <FormControlLabel value='shopping' control={<Radio color='primary' />} label='Shopping' />

                <FormControlLabel value='task' control={<Radio color='primary' />} label='Task' />
            </RadioGroup>
        </FormControl>
    )
}

export default ListType
