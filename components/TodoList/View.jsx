import { createRef, Fragment, useRef, useState } from 'react'

import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'

import { Accordion, AccordionDetails, AccordionSummary, Backdrop, Box, Button, Fade, Modal, Stack, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import ListToolbar from './ListToolbar'
import ListModal from './ListModal'

const View = ({ lists, handleUpdate }) => {
    const listRefs = useRef([])
    listRefs.current = lists.map((_, i) => listRefs.current[i] ?? createRef())

    const [copy] = useCopyToClipboard(false)

    // const [expanded, setExpanded] = useState(0)

    // const handlePanel = (panel) => (e, newExpanded) => {
    //     console.log('panel', panel)
    //     console.log('newExpanded', newExpanded)
    //     setExpanded(newExpanded ? panel : false)
    // }

    const handleCopy = async (ref) => {
        copy(ref.current)
    }
    return (
        <>
            <Typography paragraph mb={5}>
                {lists?.length ? 'View or edit a list below.' : 'Created lists will appear here.'}
            </Typography>

            {lists?.length ? (
                <Stack direction='row' flexWrap='wrap' gap={3}>
                    {lists?.map((list, i) => (
                        <Fragment key={list.id}>
                            <ListModal list={list} index={i} listRefs={listRefs} handleCopy={handleCopy} handleUpdate={handleUpdate} />
                            {/* <Accordion key={list.id} expanded={expanded === list.id} onChange={handlePanel(list.id)}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${list.id}-content`} id={`${list.id}-header`}>
                                    <Typography fontSize={26}>{list.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ p: '0' }}>
                                    <>
                                        <ListToolbar list={list} handleCopy={() => handleCopy(listRefs.current[i])} handleUpdate={handleUpdate} />

                                        <Box ref={listRefs.current[i]} sx={{ p: 3 }}>
                                            {list.items.map((item) => (
                                                <div key={item.id}>{item.text}</div>
                                            ))}
                                        </Box>
                                    </>
                                </AccordionDetails>
                            </Accordion> */}
                        </Fragment>
                    ))}
                </Stack>
            ) : (
                <Box sx={{ width: 'fit-content', backgroundColor: 'background.secondary', padding: '8px 12px', borderRadius: 1 }}>No lists to show.</Box>
            )}
        </>
    )
}

export default View
