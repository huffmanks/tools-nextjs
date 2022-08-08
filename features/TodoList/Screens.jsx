import { useLists } from '../../hooks/useContext'
import { navItems } from '../../constants/todoList'

import Skelly from '../../components/common/Skelly'
import SkellyGroup from '../../components/common/SkellyGroup'
import BottomMenu from '../../components/layout/BottomMenu'
import Create from './Create'
import Edit from './Edit'
import View from './View'

const Screens = () => {
    const { screen, changeScreen } = useLists()
    return (
        <BottomMenu screen={screen} handleScreen={changeScreen} navItems={navItems} isTodo={true}>
            {screen === '' && (
                <>
                    <Skelly type='text' />
                    <SkellyGroup skellyAmount={3} gapSize={3} />
                </>
            )}

            {screen === 'create' && <Create />}

            {screen === 'view' && <View />}

            {/* {screen === 'edit' && <Edit />} */}
        </BottomMenu>
    )
}

export default Screens
