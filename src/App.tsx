import React, { Component } from 'react';
import './App.scss';
import Incrementer from './components/Incrementer/Incrementer';

class App extends Component {
  render() {
    return <div className="container">
      <Incrementer />
    </div>;
  }
}

export default App;
