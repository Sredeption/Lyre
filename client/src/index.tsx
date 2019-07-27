import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store';

import App from './components/App';

import './index.css';

import * as serviceWorker from './serviceWorker';
import enUS from "antd-mobile/lib/locale-provider/en_US";
import {LocaleProvider} from "antd-mobile";


const store = configureStore();

ReactDOM.render((
  <LocaleProvider locale={enUS}>
    <Provider store={store}>
      <App/>
    </Provider>
  </LocaleProvider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
