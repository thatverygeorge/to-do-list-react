import React from 'react';
import { TaskType } from '../const';

const TypeSelector = (props) => {
  const {
    className = '',
    modifier = '',
    types = [],
    defaultType = TaskType.ALL,
    isReadonly = false,
    onChange = () => {},
  } = props;

  return (
    <div className={`${className} radio-type-wrapper`.trim()} onChange={onChange}>
      {types.map((type) => (
        <React.Fragment key={type}>
          <input
            className='radio-type visually-hidden'
            type='radio'
            name={`task-type--${modifier}`}
            id={`task-type-${type}--${modifier}`}
            value={type}
            autoComplete='off'
            defaultChecked={defaultType === type}
            disabled={isReadonly}
          />
          <label className='button' htmlFor={`task-type-${type}--${modifier}`}>
            {type}
          </label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default TypeSelector;
