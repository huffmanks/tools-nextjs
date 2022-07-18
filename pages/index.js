import Link from 'next/link'

import { routes } from '../constants/routes'

import { Box, Button, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material'
import SEO from '../components/layout/SEO'

const Home = () => {
    return (
        <>
            <SEO description='List of tools to help speed web development.' title='Home' url='/' imageUrl='/stratools.png' />
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '30px',
                }}>
                {routes.slice(1).map(({ key, path, name, icon, description }) => (
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
                                    aria-label={name}
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
                                {name}
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
            </Box>
        </>
    )
}

export default Home
