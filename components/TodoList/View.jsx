import { useState } from 'react'

import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const View = ({ lists }) => {
    const [expanded, setExpanded] = useState(0)

    const handlePanel = (panel) => (_, newExpanded) => {
        setExpanded(newExpanded ? panel : false)
    }
    return (
        <>
            <Typography paragraph mb={5}>
                {lists?.length ? 'View or edit a created list.' : 'No lists to show.'}
            </Typography>

            {lists?.length ? (
                lists?.map((list) => (
                    <Accordion key={list.id} expanded={expanded === list.id} onChange={handlePanel(list.id)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${list.id}-content`} id={`${list.id}-header`}>
                            <Typography>{list.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                {list.items.map((item) => (
                                    <li key={item.id}>{item.text}</li>
                                ))}
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                ))
            ) : (
                <Box sx={{ width: 'fit-content', backgroundColor: 'background.secondary', padding: '8px 12px', borderRadius: 1 }}>Create a list and it will appear here.</Box>
            )}
        </>
    )
}

export default View
