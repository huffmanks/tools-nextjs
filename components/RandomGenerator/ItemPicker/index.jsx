import { Grid } from '@mui/material'

const ItemPicker = () => {
    return (
        <>
            <Grid container spacing={5}>
                <Grid item xs={12} md={6}>
                    <div>form</div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div>output</div>
                </Grid>
            </Grid>
        </>
    )
}

export default ItemPicker
