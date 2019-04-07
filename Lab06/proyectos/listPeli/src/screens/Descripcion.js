import React from "react";
import {
  View,
  Text,
  Button,
  Image
} from "react-native";

class DescripcionScreen extends React.Component {
  render() {
    let titulo = this.props.navigation.getParam('titulo', 'Titulo en blanco');
    let descripcion = this.props.navigation.getParam('descripcion', 'Ninguna por ahora')
    let imagen = this.props.navigation.getParam('imagen', 'ninguna');
    return (
      <View style={{ flex: 1, alignItems: "center"}}>
        <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>{titulo}</Text>
        <Text>{descripcion}</Text>
        <Image
          style={{ width: 200, height: 250}}
          source={{uri: imagen}}
        />
      </View>
    );
  }
}

export default DescripcionScreen;
