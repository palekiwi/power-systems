import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore.js';
import App from './App.js';

const store = configureStore();

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
