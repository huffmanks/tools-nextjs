import { useLists } from '../../hooks/useContext'
import { navItems } from '../../constants/todoList'

import Skelly from '../../components/common/Skelly'
import SkellyGroup from '../../components/common/SkellyGroup'
import BottomMenu from '../../components/layout/BottomMenu'
import Create from './Create'
import Edit from './Edit'
import View from './View'

const Screens = () => {
    const { screen, isFocused, activeListId, changeScreen } = useLists()

    return (
        <BottomMenu screen={screen} handleScreen={changeScreen} navItems={navItems} isFocused={isFocused} activeListId={activeListId}>
            {screen === '' && (
                <>
                    <Skelly type='text' />
                    <SkellyGroup type='card' skellyAmount={4} gapSize={3} />
                </>
            )}

            {screen === 'create' && <Create />}

            {screen === 'view' && <View />}

            {screen === 'edit' && <Edit />}
        </BottomMenu>
    )
}

export default Screens
