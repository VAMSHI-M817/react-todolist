import { list } from "postcss";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Tags from "./Tags";
import TaskColumns from "./TaskColumns";

const Todo = () => {
  //HOOKS SECTION
  const [todo, setTodo] = useState({
    id: "",
    text: "",
    taskstatus: "Todo",
    tags: [],
  });
  const [List, setList] = useState([]);

  const [editingItem, setEditingItem] = useState({
    isediting: false,
    id: "",
  });

  //HANDLING THE FORM ELEMENTS INPUT DATA
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setTodo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //HANDLING THE TAGS
  const selectTag = (tag) => {
    if (todo.tags.some((eachItem) => eachItem === tag)) {
      const filterTags = todo.tags.filter((eachTag) => eachTag != tag);
      setTodo((prev) => {
        return {
          ...prev,
          tags: [filterTags],
        };
      });
    } else {
      setTodo((prev) => {
        return {
          ...prev,
          tags: [...prev.tags, tag],
        };
      });
    }
  };

  //HANDLING SUBMITTING OF DATA
  const handleSubmit = (e) => {
    e.preventDefault();
    //CREATING A NEW TODO
    const newTodo = {
      ...todo,
      id: new Date().getTime().toString(),
      text: todo.text.toUpperCase(),
      taskstatus: todo.taskstatus,
    };

    if (todo.text) {
      setList([...List, newTodo]);
      setTodo({
        text: "",
        taskstatus: "Todo",
      });
      console.log(newTodo);
    }
  };

  //HANDLING THE CHANGING THE STATE OF EDITING BUTTON
  const changeState = (commingId) => {
    const changingState = {
      isediting: true,
      id: commingId,
    };
    setEditingItem(changingState);

    const findItem = List.find((eachItem) => {
      return eachItem.id === commingId;
    });

    setTodo({
      id: findItem.id,
      text: findItem.text,
    });
  };

  //HANDLING DATA SUBMITTING AFTER DATA EDITED
  const handleEdit = (e) => {
    e.preventDefault();
    const newTodo = List.map((eachItem) => {
      if (eachItem.id === editingItem.id) {
        return {
          id: editingItem.id,
          text: todo.text.toUpperCase(),
        };
      } else {
        return eachItem;
      }
    });
    setList(newTodo);
    setTodo({
      text: "",
    });
    setEditingItem({
      isediting: false,
    });
  };

  //HANDLING THE DELETION OF TODO FROM LIST
  const handleDelete = (commingId) => {
    const FilerTodo = List.filter((eachItem) => {
      return eachItem.id !== commingId;
    });

    let timerInterval;
    Swal.fire({
      position: "top-end",
      title: "Deleting 🗑️",
      html: `${commingId} - Todo Deleted`,
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    });

    setTimeout(() => {
      setList(FilerTodo);
    }, 1000);
  };

  //STORING TODOS INTO LOCALSTORAGE
  useEffect(() => {
    const temp = JSON.stringify(List);
    localStorage.setItem("Todos", temp);
  }, [List]);

  return (
    <section>
      <h1 className="text-center font-bold -mb-10 bg-indigo-200 px-1 py-4 top-0 text-xl">
        Todo App
      </h1>
      <section className="flex flex-col justify-center mx-auto max-w-3xl padding max-container mt-2 rounded-md  ">
        <header className="shadow-md bg-white border rounded-md">
          <form
            autoComplete="off"
            className="flex flex-col justify-center px-2 py-2  rounded-md sticky top-0"
          >
            <input
              required
              aria-required="true"
              type="text"
              name="text"
              value={todo.text}
              placeholder="Enter todo"
              className="bg-white-300 border
          border-gray-200 p-2 rounded-md w-full basis-1/2 max-sm:basis-1/2 flex flex-wrap outline-none bg-gray-100 text-center"
              onChange={handleChange}
            />

            <div className="flex flex-row flex-nowrap justify-between items-center py-2 mx-auto gap-8 max-sm:flex-wrap max-sm:justify-center">
              <div className="flex justify-evenly gap-2">
                <Tags Tagname={"Morning"} selectTag={selectTag} />
                <Tags Tagname={"AfterNoon"} selectTag={selectTag} />
                <Tags Tagname={"Night"} selectTag={selectTag} />
              </div>
              <div className="flex flex-nowrap">
                <select
                  name="taskstatus"
                  value={todo.taskstatus}
                  id="task"
                  className="border-2 rounded-md outline-none "
                  onChange={handleChange}
                >
                  <option disabled>Select Status</option>
                  <option value="Todo">Todo</option>
                  <option value="Doing">Doing</option>
                  <option value="Completed">Completed</option>
                </select>

                <div>
                  {(editingItem.isediting === false && (
                    <button
                      onClick={(e) => handleSubmit(e)}
                      type="submit"
                      className="border border-gray-200 p-2 ml-2 bg-indigo-500 text-white rounded-md basis-1/6  "
                    >
                      + Add Task
                    </button>
                  )) ||
                    (editingItem.isediting === true && (
                      <button
                        onClick={(e) => handleEdit(e)}
                        type="submit"
                        className="border border-gray-200 p-2 ml-2 bg-orange-300 rounded-md basis-1/6  "
                      >
                        Submit
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </form>
        </header>
        <br />
        <hr />
        <div className="max-sm:w-full max-md:w-full ">
          <ul className="overflow-y-auto">
            {List.length === 0 && (
              <h1 className="shadow-md bg-white p-2 text-center rounded-md ">
                Not todos available
              </h1>
            )}
            {List.map((eachItem) => {
              const { id, text } = eachItem;
              return (
                <li
                  key={id}
                  className="flex select-none justify-between items-center border bg-white p-1 mt-2 rounded-md border-gray-200 shadow-md "
                >
                  <span className="ml-3 overflow-hidden">{text}</span>
                  <div className="flex ">
                    <button
                      onClick={() => changeState(id)}
                      className=" border border-gray-200 p-2 ml-2 bg-green-300 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(id)}
                      className=" border border-gray-200 p-2 ml-2 bg-red-300 rounded-md "
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <hr />
      <main className=" padding">
        <section className="grid grid-cols-3 gap-8 text-start mx-auto w-dvh max-w-7xl lg:px-4 max-md:grid-cols-2 max-sm:grid-cols-1 ">
          <TaskColumns ColumnName={"📝Todo"} />
          <TaskColumns ColumnName={"👨‍💻Doing"} />
          <TaskColumns ColumnName={"✅Done"} />
        </section>
      </main>
    </section>
  );
};

export default Todo;
