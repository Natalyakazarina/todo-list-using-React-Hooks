import React, { useState, useEffect } from "react";

function Form() {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([
    {
      title: "Buy milk",
      completed: true,
    },
    {
      title: "Some eggs",
      completed: false,
    },
    {
      title: "Go to work",
      completed: true,
    },
    {
      title: "Reactjsexample.com",
      completed: false,
    },
  ]);

  useEffect(() => {
    const data = localStorage.getItem("my-todo-list");
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("my-todo-list", JSON.stringify(tasks));
  });

  function addTasks(e) {
    setValue(e.target.value);
  }

  function submit(e) {
    e.preventDefault();
    if (!value) return;
    saveTodo(value);
    setValue("");
  }

  const saveTodo = (title) => {
    const newTasks = [...tasks, { title, completed: false }];
    setTasks(newTasks);
  };

  const completedTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks);
  };

  const deletedTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div
      className="container-main"
      style={{
        backgroundColor: "#F4F9FF",
        borderRadius: "20px",
        transform: "translate(90%,20%)",
        position: "absolute",
        margin: "auto",
      }}
    >
      <div
        className="container-data"
        style={{
          width: "400px",
          margin: " 20px",
        }}
      >
        <form onSubmit={submit}>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Enter new todo"
              value={value}
              onChange={addTasks}
            />
            <button type="button" class="btn btn-primary" onClick={submit}>
              Add task
            </button>
          </div>
        </form>
        <h1 style={{ textAlign: "left" }}>Todo List</h1>
          <div className="container-tasks">
            {tasks.map((task, index) => (
              <div className="d-flex bd-highlight border">
                <div
                  className="p-2 flex-grow-1 bd-highlight"
                  style={{
                    textDecoration: task.completed ? "line-through" : "",
                  }}
                >
                  {task.title}
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-danger p-2 bd-highlight"
                    onClick={() => completedTask(index)}
                  >
                    Completed
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-secondary p-2 bd-highlight"
                    onClick={() => deletedTask(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}

export default Form;
