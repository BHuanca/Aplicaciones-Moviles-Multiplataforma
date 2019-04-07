import React from "react";
import {
  View,
  Text,
  Button
} from "react-native";

import {createStackNavigator, createAppContainer} from "react-navigation";

import DescripcionScreen from './src/screens/Descripcion'
import HomeScreen from './src/screens/Home'

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    path: "home/",
    navigationOptions: {
      title: "Lista de peliculas"
    }
  },
  Descripcion: DescripcionScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: 'Descripcion',
      headerStyle: {
        backgroundColor: '#f4511e'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
    },
  });

export default createAppContainer(AppNavigator);
