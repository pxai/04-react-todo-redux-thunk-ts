import { ChangeEvent, useState } from 'react';
import { addTaskAsync, DispatchTaskType} from './store/task/task.actions';
import { useAppDispatch } from './hooks';

const TaskForm = ({}) => {
    const [taskValue, setTaskValue] = useState<string>('');
    const dispatch = useAppDispatch();

    const handleSave = () => {
        dispatch(addTaskAsync(taskValue));
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskValue(event.target.value);
    };

    return (
        <div>
            <input type="text" value={taskValue} onChange={handleChange} />
            <button onClick={handleSave}>Create task</button>
        </div>
    );
};

export default TaskForm;