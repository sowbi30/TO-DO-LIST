import { createSlice } from "@reduxjs/toolkit";
import Todos from "./Todos";


const initialState = [
  {
    id: 1,
    item: "Sample Todo",
     completed: false,
  },
];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Adding todos
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    // Remove todos
    removeTodo: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    // Update todos
    updateTodo: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            item: action.payload.item,
          };
        }
        return todo;
      });
    },
    // Complete todos
    completeTodo: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: true,
          };
        }
        return todo;
      });
    },
  },
});



export const {
  addTodo,
  removeTodo,
  updateTodo,
  completeTodo,
} = todosSlice.actions;
export const reducer = todosSlice.reducer;
