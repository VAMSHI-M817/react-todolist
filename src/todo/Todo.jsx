import { list } from "postcss";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Tags from "./Tags";
import TaskColumns from "./TaskColumns";

const Todo = () => {
  const [todo, setTodo] = useState({
    id: "",
    text: "",
    status: "",
    tags: [],
  });
  const [List, setList] = useState([]);

  const [editingItem, setEditingItem] = useState({
    isediting: false,
    id: "",
  });

  const [Status, setStatus] = useState("todo");

  // const filterLocal = () => {
  //   let localTodo = localStorage.getItem("Todo");
  //   let getTodo = JSON.parse(localTodo);
  //   let Rtodo = getTodo.map((eachItem) => {
  //     console.log(eachItem);
  //   });
  //   return Rtodo;
  // };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      ...todo,
      id: new Date().getTime().toString(),
      text: todo.text.toUpperCase(),
    };

    if (!todo.text) {
      let timerInterval;
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "<p>Please enter todo</p>",
        html: "",
        timer: 700,
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
      }).then((result) => {
        /* Read more about handling dismissals below */
        // if (result.dismiss === Swal.DismissReason.timer) {
        //   // console.log("I was closed by the timer");
        // }
      });
    } else {
      setList([...List, newTodo]);
      setTodo({
        text: "",
      });
    }

    if (todo.text) {
      let timerInterval;
      Swal.fire({
        position: "top-end",
        title: "<p>Todo added ✔️</p>",
        html: "",
        timer: 500,
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
      }).then((result) => {
        /* Read more about handling dismissals below */
        // if (result.dismiss === Swal.DismissReason.timer) {
        //   // console.log("I was closed by the timer");
        // }
      });
    }
  };

  const handleDelete = (commingId) => {
    const FilerTodo = List.filter((eachItem) => {
      return eachItem.id !== commingId;
    });

    let timerInterval;
    Swal.fire({
      position: "top-end",
      title: "Deleting 🗑️",
      // html: "Thank You.",
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
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        // console.log("I was closed by the timer");
      }
    });

    setTimeout(() => {
      setList(FilerTodo);
    }, 1000);
  };

  useEffect(() => {
    const temp = JSON.stringify(List);
    localStorage.setItem("Todos", temp);
  }, [List]);

  return (
    <section>
      <section className="flex flex-col justify-center mx-auto max-w-3xl padding max-container bg-white/30 mt-2 rounded-md  ">
        <header className="shadow-md bg-white border rounded-md">
          <form
            autoComplete="off"
            className="flex flex-col justify-center px-2 py-2  rounded-md sticky top-0"
          >
            <input
              type="text"
              id="todo"
              name="todo"
              value={todo.text}
              placeholder="Enter todo"
              className="bg-white-300 border
          border-gray-200 p-2 rounded-md w-full basis-1/2 max-sm:basis-1/2 flex flex-wrap outline-none bg-gray-100 text-center"
              onChange={(e) =>
                setTodo({
                  ...todo,
                  text: e.target.value,
                })
              }
            />

            <div className="flex flex-row flex-nowrap justify-between items-center py-2 mx-auto gap-8 max-sm:flex-wrap max-sm:justify-center">
              <div className="flex justify-evenly gap-2">
                <Tags Tagname={"Morning"} />
                <Tags Tagname={"AfterNoon"} />
                <Tags Tagname={"Night"} />
              </div>
              <div className="flex flex-nowrap">
                <select
                  name="task"
                  id="task"
                  className="border-2 rounded-md outline-none "
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
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
