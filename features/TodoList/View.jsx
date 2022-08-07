import { useGlobalState } from '../../hooks/useContext'
import { useTodoListFormControls } from './useTodoListFormControls'

import { Box, Grid, IconButton, Typography } from '@mui/material'

import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import ListModal from './ListModal'
import OutputMessage from '../../components/common/OutputMessage'

const View = ({ lists, handleFavorite, handleDelete }) => {
    const { modalId } = useGlobalState()
    const { handleOpenModal } = useTodoListFormControls()

    return (
        <>
            <Typography paragraph mb={5}>
                {lists?.length ? 'View or edit a list below.' : 'Created lists will appear here.'}
            </Typography>

            {lists?.length ? (
                <>
                    <Grid container spacing={3}>
                        {lists?.map((list) => (
                            <Grid key={list.id} item xs={12} sm={6} md={4}>
                                <Box
                                    sx={{
                                        height: 56,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingLeft: 2,
                                        paddingRight: 0.15,
                                        backgroundColor: list.isFavorite ? 'primary.main' : 'background.secondary',
                                        borderRadius: 1,
                                        fontSize: 20,
                                        fontWeight: 500,
                                        textTransform: 'uppercase',
                                        letterSpacing: 2,
                                        boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
                                    }}>
                                    <span>{list.title}</span>
                                    <div>
                                        <IconButton aria-label={`${list.title} list favorite`} onClick={() => handleFavorite(list.id)}>
                                            {list?.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                        </IconButton>
                                        <IconButton aria-label={`${list.title} list options`} onClick={() => handleOpenModal(list.id)}>
                                            <MoreVertIcon />
                                        </IconButton>
                                    </div>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                    <ListModal list={lists.find((list) => list.id === modalId)} handleFavorite={handleFavorite} handleDelete={handleDelete} />
                </>
            ) : (
                <OutputMessage message='No lists to show.' />
            )}
        </>
    )
}

export default View
