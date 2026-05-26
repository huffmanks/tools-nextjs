import { createContext, useEffect, useState } from "react";

import { TODO_LISTS_LS_KEY } from "../constants/todoList";
import { useGlobalState } from "../hooks/useContext";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getTimestamp } from "../utilities/getTimestamp";
import { uniqueId } from "../utilities/uniqueId";

export const TodoStateContext = createContext();

const TodoStateProvider = ({ children }) => {
  const [screen, setScreen] = useState("");
  const [lists, setLists] = useLocalStorage(TODO_LISTS_LS_KEY, []);
  const [isFocused, setIsFocused] = useState(false);
  const [activeListId, setActiveListId] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const uid = uniqueId();
  const { addToast } = useGlobalState();
  const [copy] = useCopyToClipboard(true);

  const changeScreen = (e, newScreen) => {
    setScreen(newScreen);
  };

  useEffect(() => {
    if (lists && lists.length > 0) {
      setScreen("view");
    } else {
      setScreen("create");
    }
  }, [lists]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const addList = ({ list, items }) => {
    const currentLists = lists || [];
    if (!currentLists.some((item) => item.title === list.title.trim())) {
      const newList = {
        id: uid,
        type: list.type,
        createdAt: {
          date: getTimestamp(),
          time: getTimestamp("time"),
        },
        updatedAt: {
          date: getTimestamp(),
          time: getTimestamp("time"),
        },
        title: list.title.trim(),
        isFavorite: false,
        items,
      };

      setLists([...currentLists, newList]);
    }
  };

  const setId = (id) => {
    setActiveListId(id);
  };

  const addListAsFavorite = (id) => {
    const currentLists = lists || [];
    const updatedList = currentLists.map((list) => {
      if (list.id === id) {
        addToast(`${!list.isFavorite ? "Added" : "Removed"} as favorite!`);

        return {
          ...list,
          isFavorite: !list.isFavorite,
        };
      }
      return list;
    });

    setLists(updatedList);
  };

  const copyList = async (ref) => {
    const copySuccess = await copy(ref.current);

    if (copySuccess) {
      addToast("Copied to clipboard!");
    }
  };

  const expandList = (id) => {
    if (expanded === id) return setExpanded(false);
    setExpanded(id);
  };

  const editScreen = (e, id) => {
    setId(id);
    changeScreen(e, "edit");
  };

  const updateList = (id, changedList) => {
    const currentLists = lists || [];
    const updatedList = currentLists.map((list) =>
      list.id === id
        ? {
            ...changedList,
            updatedAt: {
              date: getTimestamp(),
              time: getTimestamp("time"),
            },
          }
        : list,
    );

    setLists(updatedList);
    addToast("Updated successfully!");
  };

  const removeList = (id) => {
    const currentLists = lists || [];
    const updatedList = currentLists.filter((list) => list.id !== id);

    setLists(updatedList);
    addToast("Deleted successfully!");
  };

  const contextValue = {
    screen,
    lists: lists || [],
    isFocused,
    activeListId,
    expanded,
    changeScreen,
    handleFocus,
    handleBlur,
    addList,
    setId,
    addListAsFavorite,
    copyList,
    expandList,
    editScreen,
    updateList,
    removeList,
  };

  return <TodoStateContext.Provider value={contextValue}>{children}</TodoStateContext.Provider>;
};

export default TodoStateProvider;
