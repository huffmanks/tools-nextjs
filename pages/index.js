import { useState } from 'react'

import { calculateRoutes, formatRoutes, generateRoutes, navItems, pickerRoutes } from '../constants/routes'

import { Typography } from '@mui/material'

import SEO from '../components/common/SEO'
import PageTitle from '../components/common/PageTitle'

import CardLinks from '../features/Home/CardLinks'
import BottomMenu from '../components/layout/BottomMenu'

const Home = () => {
    const [screen, setScreen] = useState('calculate')

    const handleScreen = (_, newScreen) => {
        setScreen(newScreen)
    }
    return (
        <>
            <SEO description='List of tools to help speed web development.' title='Home' url='/' />

            <PageTitle>Home</PageTitle>

            <Typography paragraph mb={5}>
                List of tools to help speed web development.
            </Typography>

            <BottomMenu screen={screen} handleScreen={handleScreen} navItems={navItems}>
                {screen === 'calculate' && <CardLinks routes={calculateRoutes} />}

                {screen === 'format' && <CardLinks routes={formatRoutes} />}

                {screen === 'generate' && <CardLinks routes={generateRoutes} />}

                {screen === 'picker' && <CardLinks routes={pickerRoutes} />}
            </BottomMenu>
        </>
    )
}

export default Home
