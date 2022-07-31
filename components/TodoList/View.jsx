import { createRef, useEffect, useRef, useState } from 'react'

import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'

import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import ListToolbar from './ListToolbar'

const View = ({ lists, handleUpdate }) => {
    const listRefs = useRef([])
    listRefs.current = lists.map((_, i) => listRefs.current[i] ?? createRef())

    const [_, copy] = useCopyToClipboard(false)

    const [expanded, setExpanded] = useState(0)

    const handlePanel = (panel) => (_, newExpanded) => {
        setExpanded(newExpanded ? panel : false)
    }

    const handleCopy = async (ref) => {
        copy(ref.current)
    }
    return (
        <>
            <Typography paragraph mb={5}>
                {lists?.length ? 'View or edit a list below.' : 'Created lists will appear here.'}
            </Typography>

            {lists?.length ? (
                lists?.map((list, i) => (
                    <Accordion key={list.id} expanded={expanded === list.id} onChange={handlePanel(list.id)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${list.id}-content`} id={`${list.id}-header`}>
                            <Typography fontSize={26}>{list.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ backgroundColor: 'background.altSecondary' }}>
                            <Box sx={{ position: 'relative' }}>
                                <ListToolbar list={list} handleCopy={() => handleCopy(listRefs.current[i])} handleUpdate={handleUpdate} />

                                <Box ref={listRefs.current[i]} sx={{ padding: 1 }}>
                                    {list.items.map((item) => (
                                        <div key={item.id}>{item.text}</div>
                                    ))}
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))
            ) : (
                <Box sx={{ width: 'fit-content', backgroundColor: 'background.secondary', padding: '8px 12px', borderRadius: 1 }}>No lists to show.</Box>
            )}
        </>
    )
}

export default View
