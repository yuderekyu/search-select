import React from 'react';
import PropTypes from 'prop-types';
import './_Input.scss';

const propTypes = {
  /**
   * The function that executes when the input is focused.
   */
  onFocus: PropTypes.func,
  /**
   * The function that executes on a change of input value.
   */
  onInput: PropTypes.func,
  /**
   * The function that executes when a key is initially pressed.
   */
  onKeyDown: PropTypes.func,
};

const Input = ({
  onFocus,
  onInput,
  onKeyDown,
}) => (
    <input
      className={'search-input'}
      onFocus={onFocus}
      onInput={onInput}
      onKeyDown={onKeyDown}
    />
);

Input.propTypes = propTypes;
export default Input;
