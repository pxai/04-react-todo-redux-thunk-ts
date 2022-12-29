import { TASK_ACTION_TYPES } from './task.types';
import Task from '../../types/task';
import Action from '../../types/actions';

const updateTaskFromTasks = (tasks: Task[], taskToUpdate: Task) => {
    const filteredTasks = tasks.filter( (task: Task) => task.id !== taskToUpdate.id);

    return [...filteredTasks, taskToUpdate];
}

export type TaskState = {
    isLoading: boolean;
    error: string | null;
    tasks: Task[];
    searchTerm: string;
}

export const initialTaskState: TaskState = {
    isLoading: false,
    error: null,
    tasks: [],
    searchTerm: '',
}

export const taskReducer = (state = initialTaskState, action: Action) => {
    const {type, payload} = action;
    console.log("Initial state: ", state, action)
    let changedTasks = null;
    switch (type) {
        case TASK_ACTION_TYPES.SELECT_TASKS_START:
            return {
                ...state,
                isLoading: true
            };
        case TASK_ACTION_TYPES.SELECT_TASKS_SUCCESS:
            return {
                ...state,
                tasks: payload,
                isLoading: false,
                error: null
            };
        case TASK_ACTION_TYPES.SELECT_TASKS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload
            };
        case TASK_ACTION_TYPES.ADD_TASK_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case TASK_ACTION_TYPES.ADD_TASK_SUCCESS:
            console.log("Reducer: ", [...state.tasks, payload])
            return {
                ...state,
                isLoading: false,
                error: null,
                tasks: [...state.tasks, payload],
            };
        case TASK_ACTION_TYPES.ADD_TASK_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        case TASK_ACTION_TYPES.UPDATE_TASK_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case TASK_ACTION_TYPES.UPDATE_TASK_SUCCESS:
            changedTasks = updateTaskFromTasks(state.tasks, payload as Task);
            return {
                ...state,
                tasks: changedTasks,
                isLoading: false,
            };
        case TASK_ACTION_TYPES.UPDATE_TASK_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        case TASK_ACTION_TYPES.REMOVE_TASK_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case TASK_ACTION_TYPES.REMOVE_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tasks: state.tasks.filter((task: Task) => task.id !== (payload as Task).id)
            };
        case TASK_ACTION_TYPES.REMOVE_TASK_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload
            };
        case TASK_ACTION_TYPES.SEARCH_TASK:
            return {
                ...state,
                searchTerm: payload,
            };
        default:
            return state;
    }
}

