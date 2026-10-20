import { useState, type RefObject } from "react";

import { initialErrors, initialValues } from "../../constants/todoList";
import { TodoItem, TodoList } from "../../context/TodoContext";
import { useLists } from "../../hooks/useContext";
import { uniqueId } from "../../utilities/uniqueId";

export type TodoListForm = Omit<TodoList, "id" | "createdAt" | "updatedAt" | "isFavorite" | "items"> & {
  id?: TodoList["id"];
  createdAt?: TodoList["createdAt"];
  updatedAt?: TodoList["updatedAt"];
  isFavorite?: TodoList["isFavorite"];
  tempItem: string;
  items: TodoItem[];
};

type FormErrors = {
  title: boolean;
  item: boolean;
  tempItem?: boolean;
};

type AddInputEvent =
  | React.KeyboardEvent<HTMLDivElement>
  | React.MouseEvent<HTMLAnchorElement>
  | React.MouseEvent<HTMLButtonElement>;

export const useTodoListFormControls = () => {
  const uid = uniqueId();
  const { screen, activeListId, lists, changeScreen, addList, updateList } = useLists();

  const [list, setList] = useState<TodoListForm>(() => {
    const initialList = lists.find((entry) => entry.id === activeListId);

    if (initialList && screen !== "create") {
      return {
        ...initialList,
        tempItem: "",
      };
    }

    return {
      ...initialValues,
      items: [],
    };
  });
  const [items, setItems] = useState<TodoItem[]>([]);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [formIsValid, setFormIsValid] = useState(false);

  const validate = (name: string, value: string): void => {
    if (value.trim() === "") {
      setList((previous) => ({
        ...previous,
        [name]: "",
      }));

      setFormIsValid(false);

      setErrors({
        title: name === "title",
        ...(screen === "create" && {
          tempItem: name === "tempItem" && !items.length,
        }),
        item: false,
      });

      return;
    }

    setErrors(initialErrors);

    if (list.title && list.items.length > 0 && list.items.every((item) => item.text.length > 0)) {
      setFormIsValid(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, _value?: string): void => {
    const { id, name, value } = event.target;

    validate(name, value);

    if (screen === "edit" && id) {
      const updatedItems = list.items.map((item) => (item.id === id ? { ...item, text: value } : item));

      if (updatedItems.every((item) => item.text.length > 0)) {
        setFormIsValid(true);
      }

      setList((previous) => ({ ...previous, items: updatedItems }));
      return;
    }

    setList((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCompleted = (event: React.ChangeEvent<HTMLInputElement>, itemId: string): void => {
    const updatedItems = list.items.map((item) =>
      item.id === itemId ? { ...item, completed: event.target.checked } : item,
    );

    if (updatedItems.every((item) => item.text.length > 0)) {
      setFormIsValid(true);
    }

    setList((previous) => ({ ...previous, items: updatedItems }));
  };

  const handleAddItem = (event: AddInputEvent) => {
    const value = "value" in event.currentTarget ? event.currentTarget.value : "";
    const { id } = event.currentTarget;
    const isEnter = "key" in event && event.key === "Enter";

    if ((isEnter && value !== "") || (id === "addItemButton" && list.tempItem !== "")) {
      setItems((previous) => [
        ...previous,
        {
          id: uid,
          completed: false,
          text: list.tempItem.trim(),
        },
      ]);

      setList((previous) => ({
        ...previous,
        tempItem: "",
      }));

      if (list.title) setFormIsValid(true);
    }
  };

  const handleAddInput = (event: AddInputEvent, index: number, itemsRef?: RefObject<HTMLElement | null>): void => {
    const { id } = event.currentTarget;
    const isEnter = "key" in event && event.key === "Enter";

    if ((isEnter && index === list.items.length - 1) || id === "addInput") {
      const addedItem: TodoItem[] = [
        ...list.items,
        {
          id: uid,
          completed: false,
          text: "",
        },
      ];

      setList((previous) => ({
        ...previous,
        items: addedItem,
      }));

      if (!itemsRef?.current) return;

      setTimeout(() => {
        const node = itemsRef.current?.lastChild?.firstChild?.firstChild;
        const input = node instanceof Element ? node.nextElementSibling : null;

        if (input instanceof HTMLElement) input.focus();
      }, 1);
    }
  };

  const handleRemoveItem = (id: string): void => {
    const updatedItems = list.items.filter((item) => item.id !== id);

    setList((previous) => ({ ...previous, items: updatedItems }));
    setFormIsValid(true);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (screen === "create") {
      addList({ list, items });
      setList({ ...initialValues, items: [] });
      setItems([]);
      setFormIsValid(false);
    } else if (list.id) {
      const existingList = lists.find((entry) => entry.id === list.id);

      if (existingList) {
        updateList(list.id, {
          ...existingList,
          ...list,
          createdAt: existingList.createdAt,
          updatedAt: existingList.updatedAt,
          isFavorite: existingList.isFavorite,
        });
      }
    }

    changeScreen(event, "view");
  };

  return {
    list,
    items,
    errors,
    formIsValid,
    handleChange,
    handleCompleted,
    handleAddItem,
    handleAddInput,
    handleRemoveItem,
    handleSubmit,
  };
};
