import { Task } from './../../../../00-react-todo-hooks-ts/src/initialTasks';
import { RootState } from './../store';
import { createSelector } from 'reselect';
import { TaskState } from './task.reducer';

const selectTaskReducer = (state: RootState): TaskState => state.task;
export const selectSearchTerm = (state: RootState) => (state.task as TaskState).searchTerm;


export const selectTasks = createSelector(
    [selectTaskReducer],
    (task) => task.tasks
);

export const selectTaskCount = createSelector(
    [selectTaskReducer],
    (task) => task.tasks.length
);
