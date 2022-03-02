import React, { useState, useEffect } from 'react';
import TaskAddForm from './task-add-form';
import MadeBy from './made-by';
import TypeSelector from './type-selector';
import DonenessSelector from './doneness-selector';
import Task from './task';
import { getLocalStorageTasks, setLocalStorageTasks } from '../utils';
import { TaskType, DonenessType } from '../const';

const MainScreen = () => {
  const [tasks, setTasks] = useState(getLocalStorageTasks());
  const [isReadonly, setIsReadonly] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState(TaskType.ALL);
  const [donenessFilter, setDonenessFilter] = useState(DonenessType.ALL.value);

  useEffect(() => {
    setLocalStorageTasks(tasks);
  });

  const addTask = (task) => {
    setTasks([task, ...tasks]);
  };

  const deleteTask = (id) => {
    const indexToDelete = tasks.findIndex((item) => item.id === id);
    const newTasks = [...tasks.slice(0, indexToDelete), ...tasks.slice(indexToDelete + 1)];

    setTasks([...newTasks]);
  };

  const editTask = (editedTask) => {
    const indexToEdit = tasks.findIndex((item) => item.id === editedTask.id);

    const newTasks = tasks;
    newTasks.splice(indexToEdit, 1, editedTask);

    setTasks([...newTasks]);
  };

  const handleReadonlyChange = () => {
    setIsReadonly((prevState) => !prevState);
  };

  const handleSearch = (evt) => {
    const value = evt.target.value;

    if (!value) {
      setSearchFilter('');
      setTasks([...tasks]);
      return;
    }

    setSearchFilter(value);
  };

  let dragged;
  let droppedOn;

  const handleDragStart = (id) => {
    dragged = tasks.find((item) => item.id === id);
  };

  const handleDragDrop = (id) => {
    droppedOn = tasks.find((item) => item.id === id);
  };

  const handleDragEnd = () => {
    if (!droppedOn) {
      return;
    }

    const draggedIndex = tasks.findIndex((item) => item.id === dragged.id);
    const droppedOnIndex = tasks.findIndex((item) => item.id === droppedOn.id);

    if (draggedIndex === droppedOnIndex) {
      return;
    }

    const newTasks =
      draggedIndex < droppedOnIndex
        ? [
            ...tasks.slice(0, draggedIndex),
            ...tasks.slice(draggedIndex + 1, droppedOnIndex),
            droppedOn,
            dragged,
            ...tasks.slice(droppedOnIndex + 1),
          ]
        : [
            ...tasks.slice(0, droppedOnIndex),
            dragged,
            droppedOn,
            ...tasks.slice(droppedOnIndex + 1, draggedIndex),
            ...tasks.slice(draggedIndex + 1),
          ];

    setTasks([...newTasks]);
  };

  const handleTypeFilterChange = (evt) => {
    setTypeFilter(evt.target.value);
  };

  const handleDonenessFilterChange = (evt) => {
    switch (evt.target.value) {
      case DonenessType.DONE.label:
        setDonenessFilter(DonenessType.DONE.value);
        break;
      case DonenessType.NOT_DONE.label:
        setDonenessFilter(DonenessType.NOT_DONE.value);
        break;
      default:
        setDonenessFilter(DonenessType.ALL.value);
        break;
    }
  };

  const handleTasksUpload = (tasks) => {
    setTasks([...tasks]);
  };

  return (
    <main className='main'>
      <h1 className='main__title'>Just Do It!</h1>

      <TaskAddForm
        onSubmit={addTask}
        isReadonly={isReadonly}
        onReadonlyChange={handleReadonlyChange}
        onSearch={handleSearch}
        onTasksUpload={handleTasksUpload}
      />

      <MadeBy />

      <TypeSelector
        className='main__radio-type-wrapper'
        modifier='main'
        types={Object.values(TaskType)}
        defaultType={typeFilter}
        onChange={handleTypeFilterChange}
      />

      <DonenessSelector
        className='main__radio-done-wrapper'
        types={Object.values(DonenessType)}
        onChange={handleDonenessFilterChange}
      />

      <ul className={`tasks-list tasks-list--${typeFilter} main__tasks-list`}>
        {tasks
          .slice()
          .filter((item) => {
            const doesSearchMatch = searchFilter === '' ? true : item.text.includes(searchFilter);
            const doesTypeMatch = typeFilter === TaskType.ALL ? true : item.type === typeFilter;
            const doesDonenessMatch = donenessFilter === DonenessType.ALL.value ? true : item.isDone === donenessFilter;

            return doesSearchMatch && doesTypeMatch && doesDonenessMatch;
          })
          .map((item) => {
            return (
              <Task
                key={item.id}
                task={item}
                isReadonly={isReadonly}
                onDelete={deleteTask}
                onEdit={editTask}
                onDragStart={handleDragStart}
                onDragDrop={handleDragDrop}
                onDragEnd={handleDragEnd}
              />
            );
          })}
      </ul>
    </main>
  );
};

export default MainScreen;
