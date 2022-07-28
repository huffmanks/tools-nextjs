import { useState } from 'react'

import { initialValues, megaMillionsValues, powerballValues } from '../../../constants/randomPicker'

import { Typography } from '@mui/material'

import SEO from '../../../components/layout/SEO'
import PageTitle from '../../../components/layout/PageTitle'
import Panel from '../../../components/RandomPicker/Panel'
import NumberPicker from '../../../components/RandomPicker/NumberPicker'
import ItemPicker from '../../../components/RandomPicker/ItemPicker'

const RandomPicker = () => {
    const [expanded, setExpanded] = useState('panel1')
    const [values, setValues] = useState(initialValues)

    const handlePanel = (panel) => (_, newExpanded) => {
        setExpanded(newExpanded ? panel : false)
    }

    const handleChange = (e) => {
        const { value, name, type, checked } = e.target

        if (name === 'total' || name === 'start' || name === 'end') {
            setValues((prev) => ({
                ...values,
                [name]: prev[name] === '' && parseInt(value) === 0 ? '' : value.replace(/[^0-9]/g, ''),
            }))
        } else if (name === 'powerball') {
            setValues((prev) => ({
                ...powerballValues,
                isPowerball: !prev.isPowerball,
            }))
        } else if (name === 'megaMillions') {
            setValues((prev) => ({
                ...megaMillionsValues,
                isMegaMillions: !prev.isMegaMillions,
            }))
        } else {
            setValues({
                ...values,
                [name]: type === 'checkbox' ? checked : value,
            })
        }
    }

    return (
        <>
            <SEO description='Get a random number or item from a list.' title='Random Picker' url='/picker/random' imageUrl='/random-picker.png' />
            <PageTitle>Random Picker</PageTitle>

            <Typography paragraph mb={5}>
                Get a random number or item from a list.
            </Typography>

            <Panel panelId='panel1' panelTitle='Numbers' expanded={expanded} handlePanel={handlePanel}>
                <NumberPicker values={values} handleChange={handleChange} setValues={setValues} />
            </Panel>
            <Panel panelId='panel2' panelTitle='Items' expanded={expanded} handlePanel={handlePanel}>
                <ItemPicker />
            </Panel>
        </>
    )
}

export default RandomPicker
