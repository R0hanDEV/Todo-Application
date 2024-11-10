import React, { useState } from "react";
import "./App.css";
function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoText, setTodoText] = useState("");

  const handleAddTodo = () => {
    if (todoText != "") {
      setTodoList((prev) => [
        ...prev,
        {
          id: Math.random(),
          todoname: todoText.trim(),
        },
      ]);
    }
  };

  const handleDelete = (id) => {
    setTodoList((prev) => prev.filter((item) => item.id != id.target.value));
  };

  const handleEdit = (e) => {
    const idToEdit = Number(e.target.getAttribute("data-attribute"));

    const updatedText = e.target.value;

    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === idToEdit ? { ...todo, todoname: updatedText } : todo
      )
    );
  };

  const onInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const renderTodo = (item) => {
    return (
      <div className="todo-item">
        <input
          key={item.id} // Always provide a unique key when mapping
          value={item.todoname} // Bind the input to the current item's name
          name="todo"
          onChange={handleEdit} // Attach the handler to update state on change
          data-attribute={item.id} // Pass the item's ID for identification
        />
        <button onClick={handleDelete} value={item.id}>
          delete
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="app-section ">
        <h1>Todo Application</h1>

        <div className="todo-section">
          <div className="input-Add-todo">
            <input
              name="todo"
              className="todo "
              value={todoText}
              onChange={(e) => {
                onInputChange(e);
              }}
            />
            <button onClick={handleAddTodo}>Add</button>
          </div>

          <div className="wrapper">
            {todoList &&
              todoList.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    {renderTodo(item)}
                  </React.Fragment>
                );
              })}
          </div>
          {todoList.length === 0 && (
            <>
              <div className="no-todo">No todo found</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
