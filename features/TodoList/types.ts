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

export interface TodoListForm extends Omit<
  TodoList,
  "id" | "createdAt" | "updatedAt" | "isFavorite" | "items"
> {
  id?: TodoList["id"];
  createdAt?: TodoList["createdAt"];
  updatedAt?: TodoList["updatedAt"];
  isFavorite?: TodoList["isFavorite"];
  tempItem: string;
  items: TodoItem[];
}

export interface TodoListFormErrors {
  title: boolean;
  item: boolean;
  tempItem?: boolean;
}
