import { createRef, useRef } from 'react'

import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'

import { Box, Grid, Typography } from '@mui/material'

import ListModal from './ListModal'

const View = ({ lists, handleUpdate }) => {
    const listRefs = useRef([])
    listRefs.current = lists.map((_, i) => listRefs.current[i] ?? createRef())

    const [copy] = useCopyToClipboard(false)

    const handleCopy = async (ref) => {
        copy(ref.current)
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
                            <ListModal list={list} index={i} listRefs={listRefs} handleCopy={handleCopy} handleUpdate={handleUpdate} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box sx={{ width: 'fit-content', backgroundColor: 'background.secondary', padding: '8px 12px', borderRadius: 1 }}>No lists to show.</Box>
            )}
        </>
    )
}

export default View
