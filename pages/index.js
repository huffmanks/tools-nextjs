import Link from 'next/link'

import { routes } from '../constants/routes'
import SEO from '../components/layout/SEO'

import { Button, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material'

import styles from '../styles/Home.module.css'

const Home = () => {
    return (
        <>
            <SEO description='List of tools to help speed web development.' title='Home' url='/' />
            <div className={styles['home-cards']}>
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
                        <div className={styles['home-card-icon']}>
                            <Link href={path} passHref={true}>
                                <IconButton aria-label={name} color='primary'>
                                    {icon}
                                </IconButton>
                            </Link>
                        </div>
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
            </div>
        </>
    )
}

export default Home
