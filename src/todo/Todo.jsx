import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import icon from "../assets/Images/to-do-list.png"


const Todo = () => {
  //HOOKS SECTION
  const [todo, setTodo] = useState({
    id: "",
    text: "",
    taskstatus: "Todo",
    tags: [],
  });

  //GETTING TODOS FROM LOCALSTORAGE
  const getTemp = localStorage.getItem("Todos")

  //LIST OF ALL TODOS
  const [List, setList] = useState(JSON.parse(getTemp) || []);

  const [editingItem, setEditingItem] = useState({
    isediting: false,
    id: "",
  });

  //HANDLING CLEARING ALL TODOS
  const clearTodos = (e) => {
    e.preventDefault()
    setList([])
    setTodo({
      text: "",
    });
    setEditingItem({
      isediting: false,
    });
  }
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
    const res = todo.tags.some((eachItem) => eachItem === tag)
    if (res) {
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
      text: todo.text,
      taskstatus: todo.taskstatus,
      tags: [todo.tags],
    };

    if (todo.text) {
      setList([...List, newTodo]);
      setTodo({
        text: "",
        taskstatus: "Todo",
        tags: []
      });
    } else {
      alert("Please Enter task")
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
          text: todo.text,
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
      timer: 500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getHtmlContainer().querySelector('b');
        timerInterval = setInterval(() => {
          if (timer) {
            timer.textContent = Swal.getTimerLeft();
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    });

    setTimeout(() => {
      setList(FilerTodo);
    }, 1000);

    setTodo({
      text: "",
    });
    setEditingItem({
      isediting: false,
    });
  };

  //STORING TODOS INTO LOCALSTORAGE
  useEffect(() => {
    const temp = JSON.stringify(List);
    localStorage.setItem("Todos", temp);
  }, [List]);

  return (
    <section className="bg-slate-200 h-screen overflow-auto">
      <header className=" sticky top-0">
        <nav className="flex justify-between bg-white border border-gray-300 py-4 px-4 ">
          <div className="flex flex-nowrap gap-2">
            <img src={icon} alt="Icon Loading...." className="h-8 w-8" />
            <p className="font-bold text-xl text-center max-sm:hidden text-gray-500 ">
              <span className=" max-sm:hidden font-bold">Vamshi's</span>
              <span className="text-indigo-500 mx-1 font-extrabold text-3xl max-sm:text-xl relative inline-block">
                Todo
                <svg className="absolute -bottom-0.5 w-full max-h-1.5" viewBox="0 0 55 5" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  <path d="M0.652466 4.00002C15.8925 2.66668 48.0351 0.400018 54.6853 2.00002" stroke="currentColor" strokeWidth="2"></path>
                </svg>
              </span>
              App
            </p>
            
          </div>
          <div className="  place-self-center mr-8    ">
            <ul className="flex flex-nowrap gap-4 text-gray-500">
              <a href="#">
                <li>🏠Home</li>
              </a>
              <a href="#">
                <li>🧐About</li>
              </a>
              <a href="#">
                <li>💡Project</li>
              </a>
            </ul>
          </div>
        </nav>
      </header>
      <section className="flex flex-col justify-center mx-auto max-w-4xl max-h-4xl padding max-container rounded">
        <section className=" shadow-md bg-white border rounded sticky top-16 px-8 -mt-12 max-sm:mt-4">
          <form
            autoComplete="off"
            className="flex flex-row justify-center py-4 rounded "
          >
            <input
              required
              aria-required="true"
              type="text"
              name="text"
              value={todo.text}
              placeholder="Enter Todo"
              className="bg-white-300 border
           border-gray-200 rounded shadow-sm w-full outline-none text-center bg-gray-100 "
              onChange={handleChange}
            />

            <div>
              {(editingItem.isediting === false && (
                <button
                  onClick={(e) => handleSubmit(e)}
                  type="submit"
                  className="border border-gray-200 px-2 py-2 ml-2 bg-indigo-500 text-white rounded flex items-center whitespace-nowrap"
                >
                  
                  <span>+ Add <span className="max-sm:hidden">Task</span></span>
                </button>

              )) ||
                (editingItem.isediting === true && (
                  <button
                    onClick={(e) => handleEdit(e)}
                    type="submit"
                    className="border border-gray-200 py-2 px-2 ml-2 bg-orange-300 rounded   "
                  >
                    Submit
                  </button>
                ))}
            </div>

          </form>
        </section>
        <br />
        <hr />
        <div className="max-sm:w-full max-md:w-full bg-white px-2 py-2 rounded">
          <div className="flex flex-row flex-nowrap justify-between items-center bg-white mt-2 px-4 py-3">
            <p className="bg-indigo-500 inline-block px-2 text-white rounded">Todos : <span >{List.length}</span></p>
            <button
              onClick={clearTodos}
              type="submit"
              className="border border-gray-200 px-2 bg-red-500 text-white rounded  "
            >
              ✖ <span className=" max-sm:hidden"> Clear All</span>
            </button>
          </div>
          <ul className="overflow-y-auto px-4 py-4">
            {List.length === 0 && (
              <h1 className="shadow-md bg-white p-2 text-center text-gray-500 rounded border ">
                Not todos available
              </h1>
            )}
            {List.map((eachItem) => {
              const { id, text } = eachItem;
              return (
                <li
                  key={id}
                  className="flex mx-auto select-none justify-between items-center text-gray-700 border capitalize bg-gray-100 px-4 py-1 mt-2 rounded border-gray-200 shadow-md "
                >
                  <span className="ml-3 overflow-hidden">{text}</span>
                  <div className="flex ">
                    <button
                      onClick={() => changeState(id)}
                      className=" border border-white-200 bg-white p-2 ml-2 border-yellow-500  active:bg-gray-50 shadow-md rounded"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(id)}
                      className=" border p-2 ml-2 border-red-400  active:bg-red-50 bg-white shadow-md rounded "
                    >
                      ❌
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>


      </section>
      {/* <main className=" padding">
        <section className="grid grid-cols-3 gap-8 text-start mx-auto w-dvh max-w-7xl lg:px-4 max-md:grid-cols-2 max-sm:grid-cols-1 ">
          <TaskColumns ColumnName={"📝Todo"} status="Todo" tasks={List} />
          <TaskColumns ColumnName={"👨‍💻Doing"} status="Doing" tasks={List} />
          <TaskColumns ColumnName={"✅Done"} status="Done" tasks={List} />
        </section>
      </main> */}
    </section>
  );
};

export default Todo;
