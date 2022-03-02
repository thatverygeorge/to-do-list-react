const getLocalStorageTasks = () => JSON.parse(localStorage.getItem('tasks')) ?? [];

const setLocalStorageTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const getDownloadTasksURL = () => {
  const blob = new Blob([JSON.stringify(localStorage.getItem('tasks'))], {type: 'application/json'});
  const url  = URL.createObjectURL(blob);
  return url;
}

export {getLocalStorageTasks, setLocalStorageTasks, getDownloadTasksURL}