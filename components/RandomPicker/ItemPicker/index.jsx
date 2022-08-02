import { useRef, useState } from 'react'

import { useCounter } from '../../../hooks/useCounter'
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard'
import { generateRandomNumbers } from '../../../utilities/generateRandomNumbers'
import { initialItems } from '../../../constants/randomPicker'

import { Grid, Stack, TextField } from '@mui/material'

import FieldsetContainer from '../FieldsetContainer'
import Counter from '../Counter'
import DelimiterRadio from './DelimiterRadio'
import ActionGroup from '../ActionGroup'

const ItemPicker = () => {
    const resultRef = useRef(null)
    const [copy] = useCopyToClipboard()

    const [items, setItems] = useState(initialItems)
    const { handleDecrease, handleIncrease } = useCounter(items, setItems)

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target

        setItems({
            ...items,
            [name]: type === 'checkbox' ? checked : value,
        })
    }

    const handleClick = () => {
        const values = items.list.replace(/\r\n/g, '\n').split('\n')
        const lines = values.length

        const randomNumbers = generateRandomNumbers(items.total, 1, lines, true, true).map((number) => number - 1)

        const output = values.filter((_, i) => randomNumbers.includes(i))

        setItems({
            ...items,
            output,
        })
    }

    const handleCopy = async () => {
        copy(resultRef.current)
    }

    return (
        <>
            <Grid container spacing={5}>
                <Grid item xs={12} md={7}>
                    <FieldsetContainer title='Result options' size='large' helperText={`There will be ${items.total} item${items.total > 1 ? 's' : ''} selected from the list.`}>
                        <Stack direction='row' gap={5}>
                            <Counter values={items} handleChange={handleChange} handleDecrease={handleDecrease} handleIncrease={handleIncrease} />
                            <DelimiterRadio items={items} handleChange={handleChange} />
                        </Stack>
                    </FieldsetContainer>

                    <TextField
                        fullWidth
                        variant='filled'
                        multiline
                        minRows={4}
                        maxRows={6}
                        name='list'
                        label='List Items'
                        placeholder='Insert a list here'
                        value={items.list}
                        onChange={handleChange}
                        sx={{
                            mb: 3,
                            '& textarea': {
                                overflow: 'hidden',
                            },
                        }}
                    />

                    <ActionGroup isDisabled={!items?.output?.length} generateAria='pick items from a list' handleClick={handleClick} handleCopy={handleCopy} />
                </Grid>
                <Grid item xs={12} md={5}>
                    {items?.output?.length > 0 ? (
                        <div ref={resultRef}>
                            {items.output.map((item, i) => (
                                <div key={i}>{item}</div>
                            ))}
                        </div>
                    ) : (
                        <div>nothing here</div>
                    )}
                </Grid>
            </Grid>
        </>
    )
}

export default ItemPicker
