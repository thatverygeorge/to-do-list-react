import React, { useState, useEffect, useRef } from 'react';
import TypeSelector from './type-selector';
import { TaskType } from '../const';

const Task = (props) => {
  const {
    task = {},
    isReadonly = false,
    onDelete = () => {},
    onEdit = () => {},
    onDragStart = () => {},
    onDragDrop = () => {},
    onDragEnd = () => {},
  } = props;

  const { id, text, type, isDone } = task;

  const [isEditing, setIsEditing] = useState(false);
  const [currentType, setCurrentType] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    setCurrentType(type);
  }, []);

  const handleEdit = () => {
    if (inputRef.current && (inputRef.current.value !== text || currentType !== type)) {
      if (!inputRef.current.value) {
        onDelete(task);
      } else {
        const editedTask = {
          id,
          text: inputRef.current.value,
          type: currentType,
          isDone,
        };
        onEdit(editedTask);
        setIsEditing((prevState) => !prevState);
      }
    } else {
      setIsEditing((prevState) => !prevState);
    }
  };

  const handleDoneChange = () => {
    const editedTask = {
      id,
      text,
      type,
      isDone: !isDone,
    };
    onEdit(editedTask);
  };

  const handleTypeChange = (evt) => {
    setCurrentType(evt.target.value);
  };

  const setCursorAtTheEnd = (evt) => {
    evt.target.setSelectionRange(evt.target.value.length, evt.target.value.length);
  };

  return (
    <li
      draggable
      onDragStart={() => onDragStart(id)}
      onDragOver={(evt) => evt.preventDefault()}
      onDragEnter={(evt) => evt.preventDefault()}
      onDragLeave={(evt) => evt.preventDefault()}
      onDrop={() => onDragDrop(id)}
      onDragEnd={onDragEnd}
    >
      <article className='task-item tasks-list__item'>
        <input
          className='task-item__checkbox-done visually-hidden'
          type='checkbox'
          name='done'
          id={`done-${id}`}
          defaultChecked={isDone}
          autoComplete='off'
          disabled={isReadonly}
          onChange={handleDoneChange}
        />
        <label className='task-item__button button' htmlFor={`done-${id}`}>
          Done
        </label>

        {isEditing ? (
          <>
            <textarea
              className='task-input task-item__task-input'
              ref={inputRef}
              name='task-input'
              rows='5'
              defaultValue={text}
              autoComplete='off'
              autoFocus={true}
              disabled={isReadonly}
              onFocus={setCursorAtTheEnd}
            />
            <TypeSelector
              className='task-item__radio-type-wrapper'
              modifier='task-item'
              types={Object.values(TaskType).filter((type) => type !== TaskType.ALL)}
              defaultType={type}
              isReadonly={isReadonly}
              onChange={handleTypeChange}
            />
          </>
        ) : (
          <pre className='task-item__text'>{text}</pre>
        )}

        <button className='task-item__button button' type='button' disabled={isReadonly} onClick={handleEdit}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button className='task-item__button button' type='button' disabled={isReadonly} onClick={() => onDelete(id)}>
          Delete
        </button>
      </article>
    </li>
  );
};

export default Task;
