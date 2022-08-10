import { useLists } from '../../hooks/useContext'

import { Stack, Typography } from '@mui/material'

import ListCard from './ListCard'
import OutputMessage from '../../components/common/OutputMessage'

const View = () => {
    const { lists } = useLists()

    return (
        <>
            <Typography paragraph mb={5}>
                {lists?.length ? 'View or edit a list below.' : 'Created lists will appear here.'}
            </Typography>

            <ListCard />

            {lists?.length > 0 ? (
                <>
                    <Stack direction={{ xs: 'column', md: 'row' }} flexWrap='wrap' gap={3}>
                        {lists.map((list) => (
                            <ListCard key={list.id} list={list} />
                        ))}
                    </Stack>
                </>
            ) : (
                <OutputMessage message='No lists to show.' />
            )}
        </>
    )
}

export default View
