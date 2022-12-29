import TaskComponent from "./TaskComponent";
import Task from './types/task';

type TaskListProps = {
    tasks: Task[];
};

const TaskList = ({tasks}: TaskListProps) => {

    return (
        <div>
            <h1>Tasks</h1>
            {
                tasks.map( (task: Task) => <TaskComponent 
                    key={task.id} 
                    task={task}
                />)
            }
        </div>
    );
};

export default TaskList;