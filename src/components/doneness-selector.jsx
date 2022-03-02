import React from 'react';
import { DonenessType } from '../const';

const DonenessSelector = (props) => {
  const { className = '', types = [], onChange = () => {} } = props;

  return (
    <div className={`${className} radio-done-wrapper`.trim()} onChange={onChange}>
      {types.map((type) => (
        <React.Fragment key={type.label}>
          <input
            className='radio-done visually-hidden'
            type='radio'
            name='radio-done'
            id={`radio-done--${type.label}`}
            value={type.label}
            autoComplete='off'
            defaultChecked={type.label === DonenessType.ALL.label}
          />
          <label className='button' htmlFor={`radio-done--${type.label}`}>
            {type.label.split('-').join(' ')}
          </label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default DonenessSelector;
