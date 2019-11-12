import React from 'react';
import './App.css';

export default class APP extends React.Component{
  render(){
    return (
      <div className="App">
        { this.props.children }
      </div>
    )
  }
}
