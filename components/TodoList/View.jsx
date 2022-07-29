import { useRef, useState } from 'react'

import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'

import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const View = ({ lists }) => {
    const listRef = useRef(null)
    const copy = useCopyToClipboard()

    const [expanded, setExpanded] = useState(0)

    const handlePanel = (panel) => (_, newExpanded) => {
        setExpanded(newExpanded ? panel : false)
    }

    const handleClick = async () => {
        copy(listRef, true)
    }
    return (
        <>
            <Typography paragraph mb={5}>
                {lists?.length ? 'View or edit a list below.' : 'Created lists will appear here.'}
            </Typography>

            {lists?.length ? (
                lists?.map((list) => (
                    <Accordion key={list.id} expanded={expanded === list.id} onChange={handlePanel(list.id)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${list.id}-content`} id={`${list.id}-header`}>
                            <Typography>{list.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ position: 'relative' }}>
                                <IconButton aria-label='copy value to clipboard' onClick={handleClick} sx={{ position: 'absolute', top: 32, right: 32, transform: 'translate(32px, -32px)' }}>
                                    <ContentCopyIcon />
                                </IconButton>
                                <div ref={listRef}>
                                    {list.items.map((item) => (
                                        <div key={item.id}>{item.text}</div>
                                    ))}
                                </div>
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
