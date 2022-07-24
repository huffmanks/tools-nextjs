import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const Panel = ({ expanded, handlePanel, panelId, panelTitle, children }) => {
    return (
        <>
            <Accordion expanded={expanded === panelId} onChange={handlePanel(panelId)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${panelId}-content`} id={`${panelId}-header`}>
                    <Typography>{panelTitle}</Typography>
                </AccordionSummary>
                <AccordionDetails>{children}</AccordionDetails>
            </Accordion>
        </>
    )
}

export default Panel
