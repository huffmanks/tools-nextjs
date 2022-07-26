import { useState } from 'react'

import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const View = ({ lists }) => {
    const [expanded, setExpanded] = useState(1)

    const handlePanel = (panel) => (_, newExpanded) => {
        setExpanded(newExpanded ? panel : false)
    }
    return (
        <>
            {lists?.map((list) => (
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
            ))}
        </>
    )
}

export default View
