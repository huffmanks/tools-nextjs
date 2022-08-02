import { useRef, useState } from 'react'

import { useCounter } from '../../../hooks/useCounter'
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard'
import { generateSeparatedStrings } from '../../../utilities/generateSeparatedStrings'
import { generateRandomNumbers } from '../../../utilities/generateRandomNumbers'
import { initialItems } from '../../../constants/randomPicker'

import { Grid, Stack, TextField } from '@mui/material'

import FieldsetContainer from '../FieldsetContainer'
import Counter from '../Counter'
import Delimiters from './Delimiters'
import ActionGroup from '../ActionGroup'
import OutputMessage from '../../layout/OutputMessage'

const ItemPicker = () => {
    const resultRef = useRef(null)
    const [copy] = useCopyToClipboard()

    const [items, setItems] = useState(initialItems)
    const [errorMessage, setErrorMessage] = useState('')
    const { handleDecrease, handleIncrease } = useCounter(items, setItems)

    const handleChange = (e) => {
        const { name, value } = e.target

        if (errorMessage) {
            setErrorMessage('')
        }
        setItems({
            ...items,
            [name]: value.replace(/\n\s*\n/g, '\n').trim(),
        })
    }

    const handleClick = () => {
        const values = generateSeparatedStrings(items)

        if (values.isError) return setErrorMessage(values.message)

        const lines = values.length

        const randomNumbers = generateRandomNumbers(items.total, 1, lines, true).map((number) => number - 1)

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
                        <Stack direction='row' gap={5} mb={1}>
                            <Counter values={items} handleChange={handleChange} handleDecrease={handleDecrease} handleIncrease={handleIncrease} />
                            <Delimiters items={items} handleChange={handleChange} />
                        </Stack>
                    </FieldsetContainer>

                    <TextField
                        fullWidth
                        variant='filled'
                        multiline
                        minRows={4}
                        maxRows={8}
                        name='list'
                        label='List Items'
                        placeholder='Insert a list here'
                        value={items.list}
                        onChange={handleChange}
                        error={!!errorMessage}
                        {...(errorMessage && {
                            error: true,
                            helperText: errorMessage,
                        })}
                        sx={{
                            '& textarea::-webkit-scrollbar': {
                                width: 12,
                            },
                            '& textarea::-webkit-scrollbar-track': {
                                background: '#d5d7d8',
                                borderRadius: 2,
                            },
                            '& textarea::-webkit-scrollbar-thumb': {
                                background: '#676767',
                                borderRadius: 2,
                            },
                            '& textarea::-webkit-scrollbar-thumb:hover': {
                                backgroundColor: 'primary.main',
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
                        <OutputMessage message='No items to show.' />
                    )}
                </Grid>
            </Grid>
        </>
    )
}

export default ItemPicker
