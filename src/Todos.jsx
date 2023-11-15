import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo } from "./reducer";
import { GoPlus } from "react-icons/go";
import { motion } from "framer-motion";


const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodo(obj)),
  };
};

const Todos = (props) => {
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState(""); 

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const add = () => {
    if (todo === "") {
      alert("Input is Empty");
    } else {
      props.addTodo({
        id: Math.floor(Math.random() * 1000),
        item: todo,
        description: description,
        completed: false,
      });
      setTodo("");
      setDescription("");
    }
  };
  //console.log("props from store", props);
  return (
    <div className="addTodos">
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        className="todo-input"
        value={todo}
        placeholder="Todo"
      />
      <input
        type="text"
        onChange={(e) => handleChangeDescription(e)}
        className="description-input"
        value={description}
        placeholder="Description" 
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="add-btn"
        onClick={() => add()}
      >
        <GoPlus />
      </motion.button>
      <br />
    </div>
  );
};
//we can use connect method to connect this component with redux store
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
