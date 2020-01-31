import React, { useState } from 'react';
import classNames from 'classnames';
import SearchSelect from './components/SearchSelect.jsx';
import './App.scss';

// @TODO Add relevant get endpoint.
const END_POINT = '';

const App = () => {
  const [alternativeThemeIsOn, toggleAlternativeTheme] = useState(false);

  // onClickHandler is a function that toggles the alternative theme.
  const handleOnClick = event => {
    toggleAlternativeTheme(!alternativeThemeIsOn);
  }

  const appClassNames = classNames([
    { 'alternative-theme': alternativeThemeIsOn },
  ]);

  return (
    <div className={appClassNames} >
      <SearchSelect endpoint={END_POINT}/>
      <button onClick={handleOnClick}>
        Toggle Theme
      </button>
    </div>
  );
};

export default App;
