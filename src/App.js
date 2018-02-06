import React, { Component } from 'react';
import Header from './components/Header';
import Weather from './components/Weather';

class App extends Component {
  
render() {
  return (
    <div>
      <Header/> 
      <Weather />
    </div>
  );
}
}

export default App;
