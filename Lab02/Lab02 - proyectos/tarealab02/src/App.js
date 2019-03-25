import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    val1: "",
    val2: "",
    resp: ""
  }

  valorNum1 = (event) => {
    this.setState({
      val1: event.target.value
    })
  }

  valorNum2 = (event) => {
    this.setState({
      val2: event.target.value
    })
  }

  sumar = () => {
    this.setState({
      resp: parseInt(this.state.val1) + parseInt(this.state.val2)
    })
  }

  restar = () => {
    this.setState({
      resp: parseInt(this.state.val1) - parseInt(this.state.val2)
    })
  }

  multiplicar = () => {
    this.setState({
      resp: parseInt(this.state.val1) * parseInt(this.state.val2)
    })
  }

  dividir = () => {
    this.setState({
      resp: parseInt(this.state.val1) / parseInt(this.state.val2)
    })
  }

  porcentaje = () => {
    var val1 = parseInt(this.state.val1)
    var val2 = parseInt(this.state.val2)
    var resp = 0

    if(val1>=1) {
      resp = val1/100
    }else{
      resp = val2/100
    }
    this.setState({
      resp: resp
    })
  }

  render() {
    return (
      <div>
        <h1>Calculadora con React</h1>
        Ingrese valor 1 <input type="text" value={this.state.value} onChange={this.valorNum1}/><br/>
        Ingrese valor 2 <input type="text" value={this.state.value} onChange={this.valorNum2}/><br/>
        <button onClick={this.sumar}>suma</button>
        <button onClick={this.restar}>restar</button>
        <button onClick={this.multiplicar}>multiplicar</button>
        <button onClick={this.dividir}>dividir</button>
        <button onClick={this.porcentaje}>porcentaje</button>
        <p>El resultado es: {this.state.resp}</p>
      </div>
    );
  }
}

export default App;
