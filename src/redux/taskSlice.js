import { createSlice } from '@reduxjs/toolkit';

const loadTasksFromStorage = () => {
  const storedTasks = localStorage.getItem('Add-task');
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState: loadTasksFromStorage(),
  reducers: {
    addTask: (state, action) => {
      const newTask = { id: Date.now(), text: action.payload, isChecked: false, isStarred: false };
      state.push(newTask);
      localStorage.setItem('Add-task', JSON.stringify(state));
    },
    toggleCheck: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.isChecked = !task.isChecked;
        localStorage.setItem('Add-task', JSON.stringify(state));
      }
    },
    toggleStar: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.isStarred = !task.isStarred;
        localStorage.setItem('Add-task', JSON.stringify(state));
      }
    },
  },
});

export const { addTask, toggleCheck, toggleStar } = taskSlice.actions;
export default taskSlice.reducer;