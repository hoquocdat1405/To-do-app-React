import React, { useEffect, useState } from "react";
import { FaAngleDown, FaCheck } from "react-icons/fa";
import "./InputForm.css";
import { IoIosRemoveCircleOutline } from "react-icons/io";
const InputForm = () => {
  var [showContent, setShowContent] = useState([]);
  var [activeButton, setActiveButton] = useState("todo");
  var [toDo, setToDo] = useState(() => {
    const data = localStorage.getItem("toDo");
    return data ? JSON.parse(data) : [];
  });
  var [title, setTitle] = useState("");
  var [description, setDescription] = useState("");

  useEffect(() => {
    localStorage.setItem("toDo", JSON.stringify(toDo));
  }, [toDo]);

  const handleClick = (id) => {
    setShowContent((prev) => {
      if (showContent.includes(id)) {
        return showContent.filter((index) => index != id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleClickTag = (button) => {
    setActiveButton(button);
  };

  const handleClickAdd = (id) => {
    setTitle("");
    setDescription("");
    setToDo((prev)=>[...prev,{id,title,description,status:"todo"}]);
  };
  
  const handleClickCheck = (idCheck) => {
    setToDo((prev)=>
        prev.map((item)=>{
           return item.id ===idCheck?{...item,status:"completed"}:item
        })
    )
  };
  
  const handleClickRemove = (idCheck)=>{
    setToDo(prev=>prev.filter((item)=>item.id!==idCheck));
  }

  return (
    <div className="todo-wrapper">
      <h2 className="todo-header">My todos</h2>
      <form className="todo-form">
        <div className="row bottom-border">
          <div className="column">
            <label className="todo-title" htmlFor="title">
              Title:
            </label>
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              className="todo-input"
              placeholder="What's the title of your Todo"
              type="text"
              name=""
              id="title"
            />
          </div>
          <div className="column">
            <label className="todo-title" htmlFor="description">
              Description:
            </label>
            <input
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              className="todo-input"
              placeholder="What's the description of your Todo"
              type="text"
              name=""
              id="description"
            />
          </div>
          <button onClick={()=>handleClickAdd(toDo.length)} type="button" className="todo-button-add">
            Add
          </button>
        </div>
        <div className="row no-gap">
          <button
            type="button"
            className={
              activeButton === "todo"
                ? "todo-button-tag active"
                : "todo-button-tag"
            }
            onClick={() => {
              handleClickTag("todo");
            }}
          >
            Todo
          </button>
          <button
            type="button"
            className={
              activeButton === "completed"
                ? "todo-button-tag active"
                : "todo-button-tag"
            }
            onClick={() => {
              handleClickTag("completed");
            }}
          >
            Completed
          </button>
        </div>
        <ul className="todo-list">
          {toDo
            .filter((item) => item.status === activeButton)
            .map((itemFilter, index) => (
              <li
                key={index}
                className="toto-item"
              >
                <div className="todo-row">
                  <span className="todo-item-title">{itemFilter.title}</span>
                  <div className="todo-icon">
                    {itemFilter.status === "todo" && (
                      <FaCheck className="icon"
                        onClick={() => {
                          handleClickCheck(itemFilter.id);
                        }}
                      />
                    )}
                    <IoIosRemoveCircleOutline className="icon" onClick={()=>handleClickRemove(itemFilter.id)}/>
                    <FaAngleDown className="icon" onClick={() => handleClick(itemFilter.id)} />
                  </div>
                </div>
                {showContent.includes(itemFilter.id) && (
                  <p className="to-do-item-content">{itemFilter.description}</p>
                )}
              </li>
            ))}
        </ul>
      </form>
    </div>
  );
};

export default InputForm;
