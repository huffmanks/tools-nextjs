import Link from 'next/link'

import { Box, Button, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material'

const CardLinks = ({ routes }) => {
    return (
        <>
            {routes.map(({ key, path, homeName, icon, description }) => (
                <Card
                    key={key}
                    color='secondary'
                    sx={{
                        flex: '0 0 100%',
                        maxWidth: 345,
                        padding: 3,
                        '@media (min-width:450px)': {
                            flex: '0 0 325px',
                        },
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Link href={path} passHref={true}>
                            <IconButton
                                aria-label={homeName}
                                color='primary'
                                sx={{
                                    '& svg': {
                                        fontSize: '55px',
                                    },
                                }}>
                                {icon}
                            </IconButton>
                        </Link>
                    </Box>
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='div'>
                            {homeName}
                        </Typography>
                        <Typography variant='body2'>{description}</Typography>
                    </CardContent>
                    <CardActions>
                        <Link href={path} passHref={true} style={{ width: '100%', textDecoration: 'none' }}>
                            <Button variant='contained' fullWidth>
                                View
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            ))}
        </>
    )
}

export default CardLinks
