import { useState, useContext, useEffect } from "react";
import { userContext } from "../../context/userContext";
import { listContext } from "../../context/listContext";
import { List, Button, Checkbox, Popconfirm, message } from "antd";
import { getTodos } from "../../utils/getTodos";
import { deleteTodo } from "../../utils/deleteTodo";
import { EditTodoForm } from "./EditTodoForm"
import { AddTodoForm } from "./AddTodoForm"
import { editTodoStatus } from "../../utils/editTodoStatus";

const TodoList = () => {
  const { selectedList } = useContext(listContext);
  const { currentUser } = useContext(userContext);
  const [todos, setTodos] = useState();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddTodoForm, setShowAddTodoForm] = useState(false);
  const [activeTodoId, setActiveTodoId] = useState();
  const [activeTodoDescription, setActiveTodoDescription] = useState();
  // eslint-disable-next-line no-unused-vars
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const loadTodos = async () => {
      if (selectedList) {
        const data = await getTodos(selectedList);
        if (data.success) {
          setTodos(data.content);
        }
      }
    };

    loadTodos();

    return () => {
      setTodos();
    };
  }, [selectedList, currentUser]);

  // eslint-disable-next-line no-unused-vars
  const success = (message) => {
    message.open({
      type: "success",
      message: message,
    });
  };

  // eslint-disable-next-line no-unused-vars
  const error = (message) => {
    message.open({
      type: "error",
      message: message,
    });
  };

  const handleEditTodo = (id, description) => {
    setActiveTodoId(id);
    setActiveTodoDescription(description);
    setShowEditForm(!showEditForm);
  };

  const handleAddTodo = () => {
    setShowAddTodoForm(!showAddTodoForm);
  };

  const handleDeleteTodo = async (item) => {
    const data = await deleteTodo(selectedList, item.todo_id);
    if (data.success) {
      message.success(data.message);
      setTodos(todos.filter((todo) => todo.todo_id !== item.todo_id));
    } else {
      message.error("Something went wrong. Please try again later");
    }
  };

  const handleTodoStatusChange = async ({todo_id, is_complete}) => {
    const data = await editTodoStatus(selectedList, todo_id, !is_complete);
    if(data.success){
      setTodos(todos.map((todo) => {
        if(todo.todo_id === todo_id){
          return {...todo, is_complete: !is_complete}
        }
        else{
          return todo;
        }
      }))
    }
  }

  return (
    <div className="bg-gray-900">
      {contextHolder}
      <EditTodoForm 
        showEditForm={showEditForm}
        setShowEditForm={setShowEditForm}
        todo_id={activeTodoId}
        todo_description={activeTodoDescription}
        todos={todos}
        setTodos={setTodos}
      />
      <AddTodoForm 
        showAddTodoForm={showAddTodoForm}
        setShowAddTodoForm={setShowAddTodoForm}
        todos={todos}
        setTodos={setTodos}
      />
      {todos ? (<Button onClick={handleAddTodo}>Add Task</Button>) : null}
      <List
        dataSource={todos}
        renderItem={(item) => {
          return (
            <div>
              <List.Item
                actions={[
                  <Button key="edit" onClick={() => handleEditTodo(item.todo_id, item.description)}>
                    Edit
                  </Button>,
                  <Popconfirm
                    key="delete"
                    title="Delete Task"
                    description="Are you sure you want to delete this task?"
                    onConfirm={() => handleDeleteTodo(item)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger>Delete</Button>
                  </Popconfirm>,
                ]}
              >
                <div className="flex gap-4 items-center text-gray-200">
                  <Checkbox key={item.todo_id} checked={item.is_complete} onChange={() => handleTodoStatusChange(item)}/>
                  {item.description}
                </div>
              </List.Item>
            </div>
            
          );
        }}
      />
    </div>
  );
};

export default TodoList;
