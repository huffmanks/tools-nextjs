import { Fragment } from 'react'

import { cards } from '../../constants/textFormatter'

import { Grid, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const Cards = ({ values, checkedCards, handleCopy }) => {
    return (
        <>
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
