import React from 'react';
import { render } from 'react-dom';
import AppState from './AppState';
import App from './components/App';

const appState = new AppState();

render(
  <App store={appState} />,
  document.getElementById('root')
);
