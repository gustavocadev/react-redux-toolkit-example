import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '../../types/types';

export interface TaskState {
  tasks: Task[];
  editMode: boolean;
  taskIdSelectedToEdit: string;
}

const initialState = {
  tasks: [
    {
      id: crypto.randomUUID(),
      title: 'Task 1',
      description: 'Task 1 description',
    },
    {
      id: crypto.randomUUID(),
      title: 'Task 2',
      description: 'Task 2 description',
    },
    {
      id: crypto.randomUUID(),
      title: 'Task 3',
      description: 'Task 3 description',
    },
  ],
  editMode: false as boolean,
  taskIdSelectedToEdit: '',
} satisfies TaskState;

// createSlice() returns the reducer function
export const { actions, reducer } = createSlice({
  name: 'task',
  initialState,
  reducers: {
    // my reducers which at the same time are my cases
    createNewTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },

    deleteTask: (state, action: PayloadAction<Pick<Task, 'id'>>) => {
      const { id } = action.payload;
      const idx = state.tasks.findIndex((task) => task.id === id);
      state.tasks.splice(idx, 1);
    },

    updateTask: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const task = state.tasks.find(
        (task) => task.id === state.taskIdSelectedToEdit
      );
      if (!task) return;

      task.description = action.payload.description;
      task.title = action.payload.title;
    },

    toggleEditMode: (
      state,
      action: PayloadAction<Pick<Task, 'id'> & { editMode: boolean }>
    ) => {
      state.editMode = action.payload.editMode;
      state.taskIdSelectedToEdit = action.payload.id;
    },
  },
});

// Action creators are generated for each case reducer function
export const { createNewTask, deleteTask, updateTask, toggleEditMode } =
  actions;

export default reducer;
