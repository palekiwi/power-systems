import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Root from './containers/Root.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
