import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './_Option.scss';

const propTypes = {
  /**
   * The unique id of the item.
   */
  id: PropTypes.string.isRequired,
  /**
   * Signifies if the item is focused.
   */
  isFocused: PropTypes.bool,
  /**
   * The location of the item.
   */
  location: PropTypes.string,
  /**
   * The name of the item.
   */
  name: PropTypes.string,
  /**
   * The callback function that executes when the item is selected.
   */
  onClick: PropTypes.func,
  /**
   * The callback function that executes when a key is pressed.
   */
  onKeyDown: PropTypes.func,
};

const Option = ({
  id,
  isFocused,
  location,
  name,
  onClick,
  onKeyDown,
}) => {
  // handleOnKeyDown executes when the enter key is selected.
  const handleOnKeyDown = event => {
    onKeyDown(event);
    if (event.key === "Enter") {
      onClick(id);
    }
  }

  // A ref is necessary to programmatically focus on an option, based on the status of the boolean isFocused prop.
  const inputElement = useRef();
  useEffect(
    () => {
      if (isFocused) {
        inputElement.current.focus();
      }
    },
    [isFocused],
  );

  const optionClassNames = classNames([
    'option',
    { 'is-focused': isFocused },
  ]);

  return (
    <li
      className={optionClassNames}
      onClick={() => { onClick(id) }}
      onKeyDown={handleOnKeyDown}
      ref={inputElement}
      tabIndex={0}
    >
      {name && <span className={'name'}>{name}</span>}
      {location && <span className={'location'}>{location}</span>}
   </li>
  );
};

Option.propTypes = propTypes;
export default Option;
