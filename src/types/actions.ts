import { TASK_ACTION_TYPES } from "../store/task/task.types";
import Task from '../types/task';

type Action = {
    type: TASK_ACTION_TYPES;
    payload: number | string | Task;
};

export default Action;