import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Input from './_Input';
import Option from './_Option';
import './SearchSelect.scss';

const propTypes = {
  /**
   * The service url to receive results that populate the options.
   */
  endpoint: PropTypes.string.isRequired,
  /**
   * Controls whether to apply the alternative theme.
   */
  toggleTheme: PropTypes.bool,
};

const SearchSelect = ({
  endpoint,
  toggleTheme,
}) => {
  const [focusIndex, setFocusIndex] = useState(-1);
  const [optionMap, setOptionMap] = useState({});
  const [inputValue, setInputValue] = useState('');

  // handleOnfocus is a function that executes when the input receives focus.
  const handleOnFocus = () => {
    setFocusIndex(-1);
  }

  // onInput handler is a function that executes when input changes.
  const handleOnInput = event => {
    const value = event.currentTarget.value;
    setInputValue(value);

    if (value.length <= 1) {
      setOptionMap({});
      return;
    }

    //const queryUrl = endpoint.concat(value);
    //window.JSONPUtil.LoadJSONP(queryUrl, responseData => storeListItems(responseData));
    //TODO update API to except an array of objects or JSON containing list items.
  }

  // storeListItems stores response data within state then builds the associated jsx.
  const storeListItems = responseData => {
    if (responseData.total < 1) {
      // @TODO Create a no data view to render based on it's existence within state.
      //setOptionMap({'no-data': {name: 'No Data'}});
      return;
    }

    let responseMap = {};
    responseData.results.forEach(responseObject => {
      const {id} = responseObject;
      delete responseObject.id;
      const responseEntry = { [id]: responseObject };
      responseMap = { ...responseMap, ...responseEntry };
    });

    setOptionMap(responseMap);
  }

  // buildOptions creates option items based on json.
  const buildOptions = () => {
    if (inputValue.length < 2 || Object.entries(optionMap).length === 0) {
      return;
    }

    const optionsArray = [];
    let optionIndex = 0;
    for (let [key, value] of Object.entries(optionMap)) {
      const isFocused = optionIndex === focusIndex;
      optionIndex += 1;
      optionsArray.push(
        <Option
          key={key}
          id={key}
          isFocused={isFocused}
          location={value.location}
          name={value.name}
          onClick={handleOnClick}
          onKeyDown={handleOnKeyDown}
          url={value.url}
        />
      );
    }

    return (
      <ul className={'options-list'}>
        {optionsArray}
      </ul>
    );
  }

  // onClick handler navigates to a url associated with a given id, if the given option is clicked..
  const handleOnClick = id => {
    if (optionMap[id]) {
      window.location = optionMap[id].url;
    }
  }

  // onKeyDown handler updates the focus index based on arrow keys and tabs.
  const handleOnKeyDown = event => {
    if (event.key === 'ArrowDown' || (event.key === 'Tab' && !event.shiftKey)) {
      if (focusIndex < Object.entries(optionMap).length - 1) {
        setFocusIndex(focusIndex + 1 );
      }
    } else if (event.key === 'ArrowUp' || (event.key === 'Tab' && event.shiftKey)) {
      if (focusIndex > 0) {
          setFocusIndex(focusIndex - 1 );
        }
    }
  }

  const searchSelectClassNames = classNames([
    'search-select',
  ]);

  return (
    <div className={searchSelectClassNames}>
      <Input
        onInput={handleOnInput}
        onKeyDown={handleOnKeyDown}
        onFocus={handleOnFocus}
      />
      {buildOptions()}
    </div>
  );
};

SearchSelect.propTypes = propTypes;
export default SearchSelect;
