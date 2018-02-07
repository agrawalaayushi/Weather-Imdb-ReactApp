import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css';
import App from './App';
import { Router, Route, browserHistory } from 'react-router'
import ImdbRating from './components/ImdbRating';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import {loadWeather} from './actions/weatherActions';

const store = configureStore();

store.dispatch(loadWeather());

ReactDOM.render(
  <Provider store = {store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}/>
      <Route path="/imdbRating" component={ImdbRating} />
    </Router>
  </Provider>, 
document.getElementById('root'));

registerServiceWorker();
                                      