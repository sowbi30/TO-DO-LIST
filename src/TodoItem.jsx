import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";

const TodoItem = (props) => {
  const { item, updateTodo, removeTodo, completeTodo } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(item.item);
  const [editedDescription, setEditedDescription] = useState(item.description);
  const inputRef = useRef(null);

  const changeFocus = () => {
    if (inputRef.current) {
      inputRef.current.disabled = false;
      inputRef.current.focus();
    }
  };

  const startEditing = () => {
    setIsEditing(true);
    changeFocus();
  };

  const saveChanges = () => {
    updateTodo({
      id: item.id,
      item: editedValue,
      description: editedDescription,
    });
    setIsEditing(false);
  };

  return (
    <motion.li
      initial={{ x: "150vw", transition: { type: "spring", duration: 2 } }}
      animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
      whileHover={{
        scale: 0.9,
        transition: { type: "spring", duration: 0.1 },
      }}
      exit={{
        x: "-60vw",
        scale: [1, 0],
        transition: { duration: 0.5 },
        backgroundColor: "rgba(255,0,0,1)",
      }}
      key={item.id}
      className="card"
    >
      <div className="item-text">
        {isEditing ? (
          <>
            <textarea
              ref={inputRef}
              disabled={!isEditing}
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              onKeyUp={(e) => {
                if (e.which === 13) {
                  saveChanges();
                }
              }}
            />
            <textarea
              disabled={!isEditing}
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          </>
        ) : (
          <>
            <span className="todo">Todo: {editedValue}</span>
            <br /><br />
            {item.description && (
              <span className="description">Description: {editedDescription}</span>
            )}
          </>
        )}
      </div>
      <div className="btns">
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          onClick={isEditing ? saveChanges : startEditing}
        >
          {isEditing ? "Save" : "Edit"}
        </motion.button>
        {item.completed === false && (
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: "green" }}
            onClick={() => completeTodo(item.id)}
          >
            <IoCheckmarkDoneSharp />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "red" }}
          onClick={() => removeTodo(item.id)}
        >
          {" "}
          <IoClose />
        </motion.button>{" "}
      </div>
      {item.completed && <span className="completed">done</span>}
    </motion.li>
  );
};

export default TodoItem;
