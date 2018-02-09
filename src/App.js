import React, { Component } from 'react';
import Header from './components/Header';
import WeatherPage from './components/WeatherPage';

class App extends Component {
  
  render() {
    return (
      <div>
        <Header/> 
        <WeatherPage />
      </div>
    );
  }
}

export default App;
