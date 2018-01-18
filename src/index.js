import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import ReduxPromise from 'redux-promise';

import App from './App.jsx';
import './index.css';

// const reducers = () => {}; // temp

// const store = (() => applyMiddleware(ReduxPromise)(createStore))(reducers);

ReactDOM.render(
  // <Provider store={store}>
    <Router>
      <App />
    </Router>
  /* </Provider> */,
  document.getElementById('root'),
);
