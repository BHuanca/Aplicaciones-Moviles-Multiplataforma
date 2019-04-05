import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';


class Comple extends Component {
  state = {
    valor: this.props.valor,
    valor2: this.props.valor2,
    resp: 0
  }

  Sumar = () => {
    this.setState({
      resp: this.props.valor + this.props.valor2
    });
  }

  Restar = () => {
    this.setState({
      resp: this.props.valor - this.props.valor2
    });
  }

  Multiplicar = () => {
    this.setState({
      resp: this.props.valor * this.props.valor2
    });
  }

  Dividir = () => {
    this.setState({
      resp: this.props.valor / this.props.valor2
    });
  }

  render() {
    return (
      <View>
        <Text>Respuesta: {this.state.resp}</Text>
        <Button
          color="#841584"
          title="Sumar"
          onPress={this.Sumar}
        />
        <Button
          color="#1f5fbf"
          title="Restar"
          onPress={this.Restar}
        />
        <Button
          color="#bfb11f"
          title="Multiplicar"
          onPress={this.Multiplicar}
        />
        <Button
          color="#1fbf26"
          title="Dividir"
          onPress={this.Dividir}
        />
      </View>
    );
  }
}

export default Comple;
