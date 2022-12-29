import { TASK_ACTION_TYPES } from './task.types';
import axios from 'axios';
import { createAction } from '../../utils/reducer/reducer.utils';
import Task from '../../types/task';
import Action from '../../types/actions';
import { AppDispatch } from '../store';

export const selectTasksStart = () => {
    return createAction(TASK_ACTION_TYPES.SELECT_TASKS_START);
};

export const selectTasksSuccess = (tasks: Task[]) => {
    return createAction(TASK_ACTION_TYPES.SELECT_TASKS_SUCCESS, tasks);
};

export const selectTasksError = (error: string) => {
    return createAction(TASK_ACTION_TYPES.SELECT_TASKS_ERROR, error);
};

export const addTaskStart = () => {
    return createAction(TASK_ACTION_TYPES.ADD_TASK_START);
};

export const addTaskSuccess = (task: Task) => {
    return createAction(TASK_ACTION_TYPES.ADD_TASK_SUCCESS, task);
};

export const addTaskError = (error: string) => {
    return createAction(TASK_ACTION_TYPES.ADD_TASK_ERROR, error);
};

export const removeTaskStart = () => {
    return createAction(TASK_ACTION_TYPES.REMOVE_TASK_START);
};

export const removeTaskSuccess = (id: number) => {
    return createAction(TASK_ACTION_TYPES.REMOVE_TASK_SUCCESS, id);
};

export const removeTaskError = (error: string) => {
    return createAction(TASK_ACTION_TYPES.REMOVE_TASK_ERROR, error);
};

export const updateTaskStart = () => {
    return createAction(TASK_ACTION_TYPES.UPDATE_TASK_START);
};

export const updateTaskSuccess = (task: Task) => {
    return createAction(TASK_ACTION_TYPES.UPDATE_TASK_SUCCESS, task);
};

export const updateTaskError = (error: string) => {
    return createAction(TASK_ACTION_TYPES.UPDATE_TASK_ERROR, error);
};

export const searchTask = (name: string) => {
    return createAction(TASK_ACTION_TYPES.SEARCH_TASK, name);
};

export const selectTasksAsync =  () => async (dispatch: AppDispatch) => {
    dispatch(selectTasksStart());
    try {
        const response = await axios.get('/api/tasks');
        dispatch(selectTasksSuccess(response.data));
    } catch (error: unknown) {
        dispatch(selectTasksError((error as Error).message))
    }
};

export const addTaskAsync = (name: string) => async (dispatch: AppDispatch) => {
    dispatch(addTaskStart());
    try {
        const response = await axios.post('/api/tasks', {name})
        dispatch(addTaskSuccess(response.data));
    } catch (error: unknown) {
        dispatch(selectTasksError((error as Error).message))
    }
}

export const removeTaskAsync = (id: number) => async (dispatch: AppDispatch) => {
    dispatch(removeTaskStart());
    try {
        console.log("About to send ID: ", id)
        const response = await axios.delete(`/api/tasks/${id}`);
        dispatch(removeTaskSuccess(response.data))
    } catch (error: unknown) {
        dispatch(selectTasksError((error as Error).message))
    }
} 

export const updateTaskAsync = (task: Task) => async (dispatch: AppDispatch) => {
    dispatch(updateTaskStart());
    try {
        const response = await axios.put('/api/tasks', {...task});
        dispatch(updateTaskSuccess(response.data));
    } catch (error: unknown) {
        dispatch(selectTasksError((error as Error).message))
    }
}

export type DispatchTaskType = (args: Action) => Action