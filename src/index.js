import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import { Router, Route, browserHistory } from 'react-router'
import ImdbRatingPage from './components/ImdbRating';
import Blog from './components/Blog';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

const store = configureStore();
// store.dispatch(loadWeather());
// store.dispatch(loadImdbRating());
ReactDOM.render(
  <Provider store = {store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}/>
      <Route path="/imdbRating" component={ImdbRatingPage} />
      <Route path="/blog" component={Blog} />
    </Router>
  </Provider>, 
document.getElementById('root'));

registerServiceWorker();
                                      