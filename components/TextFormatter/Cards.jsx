import { Fragment } from 'react'

import { cards } from '../../constants/textFormatter'

import { Grid, Card, CardContent, CardHeader, IconButton, Typography, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const Cards = ({ values, checkedCards, checkAll, handleCheckAll, handleChange, handleCopy }) => {
    return (
        <>
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
            {cards.map((card) => (
                <Fragment key={card.name}>
                    {checkedCards.includes(card.name) && (
                        <Grid item lg={3} md={6} xs={12}>
                            <Card variant='outlined'>
                                <CardHeader
                                    title={card.label}
                                    action={
                                        <>
                                            {values?.output && (
                                                <IconButton aria-label='copy value to clipboard' onClick={() => handleCopy(card.name)}>
                                                    <ContentCopyIcon />
                                                </IconButton>
                                            )}
                                        </>
                                    }
                                />

                                {values?.output && (
                                    <CardContent>
                                        <Typography variant='body2' color='text.secondary'>
                                            {values[card.name]}
                                        </Typography>
                                    </CardContent>
                                )}
                            </Card>
                        </Grid>
                    )}
                </Fragment>
            ))}
        </>
    )
}

export default Cards
