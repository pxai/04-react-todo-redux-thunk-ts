import { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import Task from './types/task';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskSearchForm from './TaskSearchForm';
import './App.css';
import { selectSearchTerm, selectTasks } from './store/task/task.selector';
import { selectTasksAsync } from './store/task/task.actions';
import { useAppDispatch } from './hooks';

function App() {
  const tasks = useSelector(selectTasks);
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useAppDispatch();

  useEffect( () => {
    dispatch(selectTasksAsync());
  }, []);

  useCallback(() => {
    console.log("Changed List: ", tasks)
  }, [tasks]);

  const filteredTaskList = useMemo( () => {
    console.log("Lets see tasks: ", tasks)
    return tasks.filter((task: Task) => {
      return task.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
  }, [searchTerm, tasks]);

  return (
    <div className="App">
      <TaskSearchForm />
      <TaskForm />
      <TaskList 
        tasks={filteredTaskList} 
      />
    </div>
  );
}

export default App;
