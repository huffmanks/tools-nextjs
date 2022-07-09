import { Grid, TextField, MenuItem, Button, ButtonGroup } from '@mui/material'

import RestartAltIcon from '@mui/icons-material/RestartAlt'
import SaveIcon from '@mui/icons-material/Save'

const ActionGroup = ({ values, saved, handleChange, handleReset, handleSave }) => {
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
                <ButtonGroup fullWidth variant='outlined' sx={{ height: '100%' }}>
                    <Button sx={{ height: '100%' }} onClick={handleSave} aria-label='save output' endIcon={<SaveIcon />}>
                        Save
                    </Button>
                    <Button fullWidth variant='outlined' sx={{ height: '100%' }} onClick={handleReset} aria-label='reset form' endIcon={<RestartAltIcon />}>
                        Reset
                    </Button>
                </ButtonGroup>
            </Grid>
        </>
    )
}

export default ActionGroup
