import { useRef, useState } from 'react'

import { useLists } from '../../hooks/useContext'
import { useTodoListFormControls } from './useTodoListFormControls'

import { styled } from '@mui/material/styles'
import { green, pink } from '@mui/material/colors'

import { Box, Card, CardHeader, CardContent, CardActions, Collapse, Avatar, IconButton } from '@mui/material'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AssignmentIcon from '@mui/icons-material/Assignment'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ExpandMore = styled((props) => {
    const { expand, ...other } = props
    return <IconButton {...other} />
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}))

const ListCard = ({ list }) => {
    const listRef = useRef()

    const { addListAsFavorite, copyList, removeList } = useLists()
    const { handleEdit } = useTodoListFormControls()

    const [expanded, setExpanded] = useState(false)

    const handleExpandClick = (id) => {
        if (expanded === id) return setExpanded(false)
        setExpanded(id)
    }

    return (
        <>
            {list && (
                <Card sx={{ width: 300, height: '100%' }}>
                    <CardHeader
                        avatar={
                            list?.cardType === 'shopping' ? (
                                <Avatar sx={{ bgcolor: pink[600], color: 'text.primary' }} aria-label='shopping'>
                                    <ShoppingCartIcon />
                                </Avatar>
                            ) : (
                                <Avatar sx={{ bgcolor: green[800], color: 'text.primary' }} aria-label='task'>
                                    <AssignmentIcon />
                                </Avatar>
                            )
                        }
                        title={list.title}
                        subheader={list.updatedAt.date}
                        action={
                            <ExpandMore expand={expanded} onClick={() => handleExpandClick(list.id)} aria-expanded={expanded} aria-label='show more'>
                                <ExpandMoreIcon />
                            </ExpandMore>
                        }
                    />
                    <Collapse in={expanded === list.id} timeout='auto' unmountOnExit>
                        <CardContent sx={{ p: 0, '&.MuiCardContent-root:last-child': { pb: 0 } }}>
                            <Box ref={listRef} sx={{ maxHeight: 250, p: 3, overflowY: 'auto' }}>
                                {list.items.map((item) => (
                                    <div key={item.id}>{item.text}</div>
                                ))}
                            </Box>
                        </CardContent>
                    </Collapse>

                    <CardActions disableSpacing sx={{ bgcolor: 'background.secondary' }}>
                        <IconButton value='favorite' aria-label='favorite' onClick={() => addListAsFavorite(list.id)}>
                            {list.isFavorite ? <FavoriteIcon sx={{ color: 'primary.light' }} /> : <FavoriteBorderIcon />}
                        </IconButton>

                        <IconButton aria-label='copy' onClick={() => copyList(listRef)}>
                            <ContentCopyIcon />
                        </IconButton>

                        <IconButton value='edit' aria-label='edit' onClick={(e) => handleEdit(e, list.id)}>
                            <EditIcon />
                        </IconButton>

                        <IconButton value='delete' aria-label='delete' onClick={() => removeList(list.id)} sx={{ ml: 'auto' }}>
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            )}
        </>
    )
}

export default ListCard
