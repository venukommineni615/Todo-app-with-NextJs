import React, { useState } from "react";
import styles from "./todos.module.css";
import { AiTwotoneDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import classes from "./todo.module.css";
import { TiTick } from "react-icons/ti";

const Todo = (props) => {
  const todo = props.todo;
 
  const [isDisabled, setIsDisabled] = useState(true);
  const [name, setName] = useState(todo.name);
  const [edit, setEdit] = useState(false);
  const [description, setDescription] = useState(todo.description);
  const [status, setStatus] = useState(todo.done);
  const editHandler = async () => {
    setIsDisabled((prev) => {
      console.log("prev", prev);
      return !prev;
    });
    setEdit(false);
    const res = await fetch("http://localhost:3000/api/replace-todo", {
      method: "PUT",
      body: JSON.stringify({
        id: todo.id,
        done: isChecked,
        name: name,
        description: description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("changed", data);
  };
  const handleName = (event) => {
    setName(event.target.name);
  };
  const hadleDescription = (event) => {
    setDescription(event.target.description);
  };
  const changeHadler = async (event, id) => {
    setStatus((prev) => {
      return !prev;
    });
    const res = await fetch("http://localhost:3000/api/update-todo", {
      method: "PATCH",
      body: JSON.stringify({
        id: id,
        done: status,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("changed", data);
  };
  const deleteTodo = async (event, id) => {
    console.log("id", id, event);
    try {
      const res = await fetch("http://localhost:3000/api/delete-todo", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("delete", data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <li className={`${styles.item}`} key={todo.id}>
      <input
        className={`${styles.checkbox}`}
        type="checkbox"
        checked={status}
        onChange={(event) => {
          changeHadler(event, todo.id);
        }}
      ></input>
      <input
        type="text"
        value={name}
        disabled={isDisabled}
        onChange={handleName}
        className={`${classes.input}`}
      ></input>
      <input
        type="text"
        value={description}
        disabled={isDisabled}
        onChange={hadleDescription}
        className={`${classes.input}`}
      ></input>

      <div>
        {!edit && (
          <button
            onClick={() => {
              setIsDisabled((prev) => {
                console.log("prev", prev);
                return !prev;
              });
              setEdit(true);
            }}
            className={`${styles.button}`}
          >
            <CiEdit />
          </button>
        )}
        {edit && (
          <button onClick={editHandler} className={`${styles.button}`}>
            <TiTick />
          </button>
        )}

        <button
          className={`${styles.button}`}
          onClick={(event) => {
            deleteTodo(event, todo.id);
          }}
        >
          <AiTwotoneDelete className={`${styles.icon}`} />
        </button>
      </div>
    </li>
  );
};

export default Todo;
