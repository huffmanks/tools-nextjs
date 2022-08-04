import { useGlobalState } from '../../hooks/useGlobalState'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'

import { Button, Grid, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import ListModal from './ListModal'
import OutputMessage from '../../components/common/OutputMessage'

const View = ({ lists, handleFavorite, handleDelete }) => {
    const { addModal, addToast } = useGlobalState()
    const [copy] = useCopyToClipboard(true)

    const handleCopy = async (ref) => {
        const copySuccess = await copy(ref.current)

        if (copySuccess) {
            addToast('Copied to clipboard!')
        }
    }

    const handleOpenModal = (id) => {
        addModal(lists, id)
    }

    return (
        <>
            <Typography paragraph mb={5}>
                {lists?.length ? 'View or edit a list below.' : 'Created lists will appear here.'}
            </Typography>

            {lists?.length ? (
                <>
                    <Grid container spacing={3}>
                        {lists?.map((list, i) => (
                            <Grid key={list.id} item xs={12} sm={6} md={4}>
                                <Button
                                    fullWidth
                                    variant='contained'
                                    onClick={() => handleOpenModal(list.id)}
                                    endIcon={<MoreVertIcon fontSize='medium' />}
                                    sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 20 }}>
                                    {list.title}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                    <ListModal handleCopy={handleCopy} handleFavorite={handleFavorite} handleDelete={handleDelete} />
                </>
            ) : (
                <OutputMessage message='No lists to show.' />
            )}
        </>
    )
}

export default View
