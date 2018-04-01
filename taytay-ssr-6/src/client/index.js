import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/app.component';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createAppStore} from './create-store';

const store = createAppStore(window.APP_STATE || {});

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
