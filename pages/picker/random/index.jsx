import { useState } from 'react'

import { Typography } from '@mui/material'

import SEO from '../../../components/layout/SEO'
import PageTitle from '../../../components/layout/PageTitle'
import Panel from '../../../components/RandomPicker/Panel'
import NumberPicker from '../../../components/RandomPicker/NumberPicker'
import ItemPicker from '../../../components/RandomPicker/ItemPicker'

const RandomPicker = () => {
    const [expanded, setExpanded] = useState('panel1')

    const handlePanel = (panel) => (_, newExpanded) => {
        setExpanded(newExpanded ? panel : false)
    }

    return (
        <>
            <SEO description='Get a random number or item from a list.' title='Random Picker' url='/picker/random' imageUrl='/random-picker.png' />
            <PageTitle>Random Picker</PageTitle>

            <Typography paragraph mb={5}>
                Get a random number or item from a list.
            </Typography>

            <Panel panelId='panel1' panelTitle='Numbers' expanded={expanded} handlePanel={handlePanel}>
                <NumberPicker />
            </Panel>
            <Panel panelId='panel2' panelTitle='Items' expanded={expanded} handlePanel={handlePanel}>
                <ItemPicker />
            </Panel>
        </>
    )
}

export default RandomPicker
