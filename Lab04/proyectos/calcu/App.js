/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput
  } from 'react-native';

import Contador from './src/components/Comple';

export default class App extends Component<Props> {
  state = {
    num1: '',
    num2: ''
  }
  handleChange1 = (val) => {
    this.setState({
        num1: val
    });
  }
  handleChange2 = (val1) => {
    this.setState({
        num2: val1
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Calculadora</Text>
        <Text style={styles.instructions}>Numero 1</Text>
        <TextInput
          value={this.state.num1}
          onChangeText={this.handleChange1}
        />
        <Text style={styles.instructions}>Numero 2</Text>
        <TextInput
          value={this.state.num2}
          onChangeText={this.handleChange2}
        />
        {!isNaN(this.state.num1)?(
            <View>
              <Contador
                valor={parseInt(this.state.num1)}
                valor2={parseInt(this.state.num2)}
               />
            </View>
        ):(<Text>Debe ingresar un numero!</Text>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
