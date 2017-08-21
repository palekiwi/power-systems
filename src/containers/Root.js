import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore.js';
import App from './App.js';
import scenes from '../data/scenes';

const store = configureStore({
  scenes
});

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
