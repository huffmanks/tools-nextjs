import { useState } from 'react'

import { calculateRoutes, formatRoutes, generateRoutes, pickerRoutes } from '../constants/routes'

import { Box, Tab, Tabs, Typography } from '@mui/material'

import SEO from '../components/layout/SEO'
import PageTitle from '../components/layout/PageTitle'
import { a11yProps, TabPanel } from '../components/Home/TabPanel'
import CardLinks from '../components/Home/CardLinks'

const Home = () => {
    const [value, setValue] = useState(0)

    const handleChange = (_, newValue) => {
        setValue(newValue)
    }
    return (
        <>
            <SEO description='List of tools to help speed web development.' title='Home' url='/' />

            <PageTitle>Home</PageTitle>
            <Typography paragraph mb={5}>
                List of tools to help speed web development.
            </Typography>

            <Box sx={{ width: '100%' }}>
                <Tabs variant='scrollable' scrollButtons allowScrollButtonsMobile value={value} onChange={handleChange} aria-label='tabs for pages' sx={{ marginBottom: 4 }}>
                    <Tab label='Calculate' {...a11yProps(0)} />
                    <Tab label='Format' {...a11yProps(1)} />
                    <Tab label='Generate' {...a11yProps(2)} />
                    <Tab label='Picker' {...a11yProps(3)} />
                </Tabs>

                <TabPanel value={value} index={0}>
                    <CardLinks routes={calculateRoutes} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CardLinks routes={formatRoutes} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <CardLinks routes={generateRoutes} />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <CardLinks routes={pickerRoutes} />
                </TabPanel>
            </Box>
        </>
    )
}

export default Home
