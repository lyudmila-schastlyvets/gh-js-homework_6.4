import React, { Component } from 'react';
import './App.css';
import MyComponent from './myComponent'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.parameters =
      {
        name: 'Taras',
        health: 80,
        happiness: 50,
        satiety: 30,
        fatigue: 50
      }

  }

  render() {
    return (
        <div className="App text-center main">
            <MyComponent parametersInit={this.parameters}/>
        </div>
    );
  }
}