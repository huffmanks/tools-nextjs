import { createRef, useRef } from 'react'

import { useGlobalState } from '../../hooks/useGlobalState'
import { useTodoListFormControls } from '../../hooks/useTodoListFormControls'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'

import { Grid, Typography } from '@mui/material'

import ListModal from './ListModal'
import OutputMessage from '../layout/OutputMessage'

const View = () => {
    const { lists } = useTodoListFormControls()
    const { addToast } = useGlobalState()
    const [copy] = useCopyToClipboard(true)

    const listRefs = useRef([])
    listRefs.current = lists.map((_, i) => listRefs.current[i] ?? createRef())

    const handleCopy = async (ref) => {
        const copySuccess = await copy(ref.current)

        if (copySuccess) {
            addToast('Copied to clipboard!')
        }
    }

    return (
        <>
            <Typography paragraph mb={5}>
                {lists?.length ? 'View or edit a list below.' : 'Created lists will appear here.'}
            </Typography>

            {lists?.length ? (
                <Grid container spacing={3}>
                    {lists?.map((list, i) => (
                        <Grid key={list.id} item xs={12} sm={6} md={4}>
                            <ListModal list={list} index={i} listRefs={listRefs} handleCopy={handleCopy} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <OutputMessage message='No lists to show.' />
            )}
        </>
    )
}

export default View
