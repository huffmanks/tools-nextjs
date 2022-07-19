import { useState } from 'react'

import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const Panel = ({ panelId, panelTitle, children }) => {
    const [expanded, setExpanded] = useState(false)

    const handlePanel = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    return (
        <>
            <Accordion expanded={expanded === panelId} onChange={handlePanel(panelId)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${panelId}bh-content`} id={`${panelId}bh-header`}>
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>{panelTitle}</Typography>
                </AccordionSummary>
                <AccordionDetails>{children}</AccordionDetails>
            </Accordion>

            {/* <Accordion expanded={expanded === 'panel2'} onChange={handlePanel('panel2')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel2bh-content' id='panel2bh-header'>
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Item Picker</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>222</div>
                </AccordionDetails>
            </Accordion> */}
        </>
    )
}

export default Panel
