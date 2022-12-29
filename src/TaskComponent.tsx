import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTaskAsync, removeTaskAsync } from './store/task/task.actions';
import Task from './types/task';
import { useAppDispatch } from './hooks';

type TaskComponentProps = {
    task: Task;
};

const TaskComponent = ({task}: TaskComponentProps) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [taskValue, setTaskValue] = useState<string>(task.name);
    const dispatch = useAppDispatch();

    const handleEdit = () => {
        setEdit(true);
    };

    const setTask = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskValue(event.target.value);
    };

    const updateTaskHandler = () => {
        dispatch(updateTaskAsync({...task, name: taskValue }));
        setEdit(false);
    }

    const deleteTaskHandler = () => {
        dispatch(removeTaskAsync(task.id));
    };

    return (
        edit ?
            <div>
                <input type="text" value={taskValue} onChange={setTask}/>
                <button onClick={updateTaskHandler}>Save</button>
            </div>
        :   <div>
                {task.id}
                {task.name}
                <button onClick={handleEdit}>Edit</button>
                <button onClick={deleteTaskHandler}>Delete</button>
            </div>
    )
};

export default TaskComponent;