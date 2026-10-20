import { createContext, useState } from "react";

import { TODO_LISTS_LS_KEY } from "../constants/todoList";
import { useGlobalState } from "../hooks/useContext";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getTimestamp } from "../utilities/getTimestamp";
import { uniqueId } from "../utilities/uniqueId";

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoList {
  id: string;
  type: string;
  createdAt: { date: string; time: string };
  updatedAt: { date: string; time: string };
  title: string;
  isFavorite: boolean;
  items: TodoItem[];
}

interface TodoStateContextType {
  screen: string;
  lists: TodoList[];
  isFocused: boolean;
  activeListId: string | null;
  expanded: string | boolean;
  changeScreen: (_: unknown, newScreen: string) => void;
  handleFocus: () => void;
  handleBlur: () => void;
  addList: (data: { list: { title: string; type: string }; items: TodoItem[] }) => void;
  setId: (id: string) => void;
  addListAsFavorite: (id: string) => void;
  copyList: (listToCopy: TodoList) => Promise<void>;
  expandList: (id: string) => void;
  editScreen: (e: any, id: string) => void;
  updateList: (id: string, changedList: TodoList) => void;
  removeList: (id: string) => void;
}

export const TodoStateContext = createContext<TodoStateContextType | null>(null);

interface TodoStateProviderProps {
  children: React.ReactNode;
}

const TodoStateProvider = ({ children }: TodoStateProviderProps) => {
  const [lists, setLists] = useLocalStorage<TodoList[]>(TODO_LISTS_LS_KEY, []);
  const [screen, setScreen] = useState(() => (lists && lists.length > 0 ? "view" : "create"));
  const [isFocused, setIsFocused] = useState(false);
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | boolean>(false);

  const uid = uniqueId();
  const { addToast } = useGlobalState();
  const [copy] = useCopyToClipboard(true);

  const changeScreen = (_: unknown, newScreen: string) => {
    setScreen(newScreen);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const addList = ({ list, items }: { list: { title: string; type: string }; items: TodoItem[] }) => {
    const currentLists = lists || [];
    if (!currentLists.some((item) => item.title === list.title.trim())) {
      const newList: TodoList = {
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
      setScreen("view");
    }
  };

  const setId = (id: string) => {
    setActiveListId(id);
  };

  const addListAsFavorite = (id: string) => {
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

  const copyList = async (listToCopy: TodoList) => {
    if (!listToCopy || !listToCopy.items) return;

    const formattedText = listToCopy.items.map((item) => item.text).join("\r\n");

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(formattedText);
        addToast("Copied to clipboard!");
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = formattedText;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        addToast("Copied to clipboard!");
      }
    } catch (err) {
      console.error("Failed to copy list: ", err);
    }
  };

  const expandList = (id: string) => {
    if (expanded === id) return setExpanded(false);
    setExpanded(id);
  };

  const editScreen = (e: any, id: string) => {
    setId(id);
    changeScreen(e, "edit");
  };

  const updateList = (id: string, changedList: TodoList) => {
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

  const removeList = (id: string) => {
    const currentLists = lists || [];
    const updatedList = currentLists.filter((list) => list.id !== id);

    setLists(updatedList);
    if (updatedList.length === 0) {
      setScreen("create");
    }
    addToast("Deleted successfully!");
  };

  const contextValue: TodoStateContextType = {
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
