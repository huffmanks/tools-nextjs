import { cards } from '../../constants/textFormatter'

import { Grid, TextField, MenuItem, Button, ButtonGroup, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material'

import RestartAltIcon from '@mui/icons-material/RestartAlt'
import SaveIcon from '@mui/icons-material/Save'

const ActionGroup = ({ values, saved, checkAll, handleChange, handleCheckAll, handleSave, handleReset }) => {
    return (
        <>
            <Grid item lg={9} md={7} xs={12}>
                <TextField fullWidth select disabled={!saved.length} label='Saved Items' name='selected' value={values.selected} onChange={handleChange}>
                    {saved.map((option) => (
                        <MenuItem key={option.id} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item lg={3} md={5} xs={12}>
                <ButtonGroup fullWidth variant='contained' sx={{ height: '100%' }}>
                    <Button sx={{ height: '100%' }} onClick={handleSave} aria-label='save output' endIcon={<SaveIcon />}>
                        Save
                    </Button>
                    <Button fullWidth variant='contained' sx={{ height: '100%' }} onClick={handleReset} aria-label='reset form' endIcon={<RestartAltIcon />}>
                        Reset
                    </Button>
                </ButtonGroup>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth component='fieldset' variant='outlined'>
                    <FormLabel component='legend'>Select formats</FormLabel>
                    <FormGroup row>
                        <FormControlLabel control={<Checkbox checked={checkAll} onChange={handleCheckAll} name='check_all' />} label='Select all' />
                        {cards.map((box) => (
                            <FormControlLabel key={box.name} control={<Checkbox checked={values[`check_${box.name}`]} onChange={handleChange} name={`check_${box.name}`} />} label={box.label} />
                        ))}
                    </FormGroup>
                </FormControl>
            </Grid>
        </>
    )
}

export default ActionGroup
