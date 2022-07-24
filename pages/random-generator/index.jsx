import { useState } from 'react'

import { initialValues, megaMillionsValues, powerballValues } from '../../constants/randomGenerator'

import SEO from '../../components/layout/SEO'
import PageTitle from '../../components/layout/PageTitle'
import Panel from '../../components/RandomGenerator/Panel'
import NumberPicker from '../../components/RandomGenerator/NumberPicker'
import ItemPicker from '../../components/RandomGenerator/ItemPicker'

const RandomGenerator = () => {
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
            <SEO
                description='Get a random number or item from a list.'
                title='Random Generator'
                url='/random-generator'
                // imageUrl='/random-generator.png'
            />
            <PageTitle>Random Generator</PageTitle>

            <Panel panelId='panel1' panelTitle='Number Picker' expanded={expanded} handlePanel={handlePanel}>
                <NumberPicker values={values} handleChange={handleChange} setValues={setValues} />
            </Panel>
            <Panel panelId='panel2' panelTitle='Item Picker' expanded={expanded} handlePanel={handlePanel}>
                <ItemPicker />
            </Panel>
        </>
    )
}

export default RandomGenerator
