import React from 'react';
import TypeSelector from './type-selector';
import { TaskType } from '../const';
import { nanoid } from 'nanoid';
import { getDownloadTasksURL } from '../utils';

const TaskAddForm = (props) => {
  const {
    isReadonly = false,
    onSubmit = () => {},
    onReadonlyChange = () => {},
    onSearch = () => {},
    onTasksUpload = () => {},
  } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const text = formData.get('task-input');
    const type = formData.get('task-type--form');

    const newTask = {
      id: nanoid(),
      text,
      type,
      isDone: false,
    };

    onSubmit(newTask);
    evt.target.elements['task-input'].value = '';
  };

  const handleTasksUpload = (evt) => {
    const file = evt.target.files[0];
    const fileName = file.name.toLowerCase();

    const isValidFile = fileName.endsWith('json');

    if (isValidFile) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        onTasksUpload(JSON.parse(JSON.parse(reader.result)));
      });

      reader.readAsText(file);
    }
  };

  return (
    <form className='form main__form' onSubmit={handleSubmit}>
      <textarea
        className='task-input form__task-input'
        name='task-input'
        rows='5'
        placeholder='Enter task'
        autoComplete='off'
        required
        disabled={isReadonly}
      />
      <TypeSelector
        className='form__radio-type-wrapper'
        modifier='form'
        types={Object.values(TaskType).filter((type) => type !== TaskType.ALL)}
        defaultType={TaskType.WORK}
        isReadonly={isReadonly}
      />
      <button className='form__button-add button' type='submit' aria-label='Add task' disabled={isReadonly}>
        ADD
      </button>

      <input
        className='form__checkbox-readonly visually-hidden'
        type='checkbox'
        name='readonly'
        id='readonly'
        autoComplete='off'
        onChange={onReadonlyChange}
      />
      <label className='form__button-readonly button' htmlFor='readonly'>
        Readonly
      </label>

      <input type='text' className='form__input-search' name='search-input' placeholder='Search' onInput={onSearch} />

      <a className='form__button-save button' href={getDownloadTasksURL()} download='just-do-it-tasks.json'>
        Save tasks
      </a>

      <input
        className='form__input-file visually-hidden'
        type='file'
        accept='application/json'
        id='upload-tasks'
        name='upload-tasks'
        onChange={handleTasksUpload}
        disabled={isReadonly}
      />
      <label className='form__button-upload button' htmlFor='upload-tasks'>
        Upload tasks
      </label>
    </form>
  );
};

export default TaskAddForm;
