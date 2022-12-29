import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import initialTasks from '../../../initialTasks';

let tasks = initialTasks;
const mockServer = new MockAdapter(axios);
mockServer.onGet('/api/tasks').reply(200, tasks);

mockServer.onPost('/api/tasks').reply(function (config) {
    const { name } = JSON.parse(config.data)
    const task = {id: Math.round(Math.random() * 10000), name };

    return [200, task];
});

mockServer.onPut('/api/tasks').reply(function (config) {
    const updatedTask = JSON.parse(config.data)
    const filteredTasks = tasks.filter( task => task.id !== updatedTask.id);
    tasks = [...filteredTasks, updatedTask];

    return [200, updatedTask];
});

mockServer.onDelete(/\/api\/tasks\/[0-9]+/).reply(function (config) {
    const deletedTaskId = +config.url.split("/").slice(-1)[0];
    tasks = tasks.filter( task => task.id !== deletedTaskId);

    return [200, {id: deletedTaskId}];
});

export default mockServer;