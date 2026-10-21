import { useLists } from "@/hooks/useLists";

import Create from "@/features/TodoList/Create";
import Edit from "@/features/TodoList/Edit";
import View from "@/features/TodoList/View";
import { todoListNavItems } from "@/features/TodoList/constants";

import Skelly from "@/components/common/Skelly";
import SkellyGroup from "@/components/common/SkellyGroup";
import BottomMenu from "@/components/layout/BottomMenu";

const Screens = () => {
  const { screen, isFocused, activeListId, changeScreen } = useLists();

  return (
    <BottomMenu
      screen={screen}
      handleScreen={changeScreen}
      navItems={todoListNavItems}
      isFocused={isFocused}
      activeListId={activeListId}>
      {screen === "" && (
        <>
          <Skelly type="text" />
          <SkellyGroup type="card" skellyAmount={4} gapSize={3} />
        </>
      )}

      {screen === "create" && <Create />}

      {screen === "view" && <View />}

      {screen === "edit" && <Edit />}
    </BottomMenu>
  );
};

export default Screens;
