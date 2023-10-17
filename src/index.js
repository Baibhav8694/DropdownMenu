import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
// import './index.css';
import store from './redux/store';  // Make sure this path points to where you've configured your Redux store.
import App from './App';

const rootElement = document.getElementById('root');
const reactRoot = createRoot(rootElement);

reactRoot.render(
  <Provider store={store}>
    <App />
  </Provider>
);
