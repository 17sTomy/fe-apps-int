import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { Entrypoint } from './Entrypoint';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Entrypoint />
  </Provider>
);
