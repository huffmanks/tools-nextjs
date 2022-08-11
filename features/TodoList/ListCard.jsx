import { useRef, useState } from 'react'

import { useLists } from '../../hooks/useContext'
import { useTodoListFormControls } from './useTodoListFormControls'

import { styled } from '@mui/material/styles'
import { green, pink } from '@mui/material/colors'

import { Box, Card, CardHeader, CardContent, CardActions, Collapse, Avatar, IconButton, Typography } from '@mui/material'

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

    const { expanded, addListAsFavorite, copyList, expandList, editScreen, removeList } = useLists()

    return (
        <>
            {list && (
                <Card sx={{ width: 300, height: '100%', backgroundColor: 'background.alt', backgroundImage: 'none' }}>
                    <CardHeader
                        avatar={
                            list?.type === 'shopping' ? (
                                <Avatar sx={{ bgcolor: list.isFavorite ? 'primary.main' : pink[600], color: 'text.primary' }} aria-label='shopping'>
                                    <ShoppingCartIcon />
                                </Avatar>
                            ) : (
                                <Avatar sx={{ bgcolor: list.isFavorite ? 'primary.main' : green[800], color: 'text.primary' }} aria-label='task'>
                                    <AssignmentIcon />
                                </Avatar>
                            )
                        }
                        title={list.title}
                        subheader={list.createdAt.date}
                        action={
                            <ExpandMore expand={expanded === list.id} onClick={() => expandList(list.id)} aria-expanded={expanded === list.id} aria-label='show more'>
                                <ExpandMoreIcon />
                            </ExpandMore>
                        }
                    />
                    <Collapse in={expanded === list.id} timeout='auto' unmountOnExit>
                        <CardContent sx={{ p: 0, '&.MuiCardContent-root:last-child': { pb: 0 } }}>
                            <Box sx={{ maxHeight: 250, p: 3, backgroundColor: expanded ? 'background.altTwo' : 'background.alt', overflowY: 'auto' }}>
                                <div ref={listRef}>
                                    {list.items.map((item) => (
                                        <div key={item.id}>{item.text}</div>
                                    ))}
                                </div>

                                <Typography component='div' variant='caption' mt={3}>
                                    {`Updated: ${list.updatedAt.date} ${list.updatedAt.time}`}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Collapse>

                    <CardActions disableSpacing sx={{ bgcolor: expanded === list.id ? 'background.alt' : 'background.altTwo' }}>
                        <IconButton value='favorite' aria-label='favorite' onClick={() => addListAsFavorite(list.id)}>
                            {list.isFavorite ? <FavoriteIcon sx={{ color: 'primary.light' }} /> : <FavoriteBorderIcon />}
                        </IconButton>

                        <IconButton aria-label='copy' onClick={() => copyList(listRef)}>
                            <ContentCopyIcon />
                        </IconButton>

                        <IconButton value='edit' aria-label='edit' onClick={(e) => editScreen(e, list.id)}>
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
