import Screens from "@/features/TodoList/Screens";
import TodoStateProvider from "@/features/TodoList/TodoContext";

import PageTitle from "@/components/common/PageTitle";
import SEO from "@/components/common/SEO";

const TodoList = () => {
  return (
    <TodoStateProvider>
      <SEO
        description="Create a todo list."
        title="Todo List"
        url="/generate/todo"
        imageUrl="/todo-list.png"
      />

      <PageTitle>Todo List</PageTitle>

      <Screens />
    </TodoStateProvider>
  );
};

export default TodoList;
