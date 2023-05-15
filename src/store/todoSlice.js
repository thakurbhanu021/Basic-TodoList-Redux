import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getTodosAsync = createAsyncThunk('todos/getTodosAsync',
  async () => {
    const response = fetch('https://basic-todolist-12587-default-rtdb.firebaseio.com/todos')
    if(response.ok){
      const todos = await response.json();
      return {todos}
    }
  }
)
 
const todoSlice = createSlice({
  name: "todos",
  initialState: [
    { id: 1, title: "todo1", completed: true },
    { id: 2, title: "todo2", completed: false },
    { id: 3, title: "todo3", completed: true },
    { id: 4, title: "todo4", completed: false },
    { id: 5, title: "todo5", completed: false },
  ],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo : (state, action) => {
        return state.filter((todo)=> todo.id !== action.payload.id)
    }
  },
  extraReducers: {
    [getTodosAsync.fulfilled]: (state,action)=>{}
  }
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
