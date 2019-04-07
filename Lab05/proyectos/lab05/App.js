/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput
} from 'react-native';

import axios from 'axios';

/*
const people = [
  {name: 'Carlos', lastname: 'Amezquita'},
  {name: 'Maria', lastname: 'Chavez'},
  {name: 'Pedro', lastname: 'Picapiedra'},
  {name: 'Lucia', lastname: 'Gonzales'}
]*/

export default class App extends Component<Props> {
  state = {
    loading: false,
    data: [],
    text: ''
  }
  componentDidMount() {
    this.setState({loading: true});
    axios({
      method: 'GET',
      url: 'https://yts.am/api/v2/list_movies.json'
    }).then(response => {
      this.setState({
        loading: false,
        data: response.data.data.movies
      });
      peli = response.data.data.movies;
    }).catch(err => {
      this.setState({loading: false});
      console.warn(err);
    })
  }
  onPressHandler = item => {
    alert(item.description_full);
    //alert(peli);
  }

  renderHeader = () => {
    return (<TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
      onChangeText={this.searchHandler}
      value={this.state.text}
    />);
  }
  searchHandler = text => {

    this.setState({
      text: text
    }, () => {
      axios({
        method: 'GET',
        url: 'https://yts.am/api/v2/list_movies.json?query_term='+text
      }).then(response => {
        this.setState({
          loading: false,
          data: response.data.data.movies
        });
      }).catch(err => {
        this.setState({loading: false});
        console.warn(err);
      })

      const newData = peli.filter(item => {
        const itemData = item.title.toUpperCase();
        //`${item.name.toUpperCase()}`; - Preguntar porque se le pone el simbolo de dolar
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
        });
        this.setState({
          data: newData
        });
      });
  }

  render() {
    let contenido = (<Text>
      Cargando, espere por favor...
    </Text>);
    if(!this.state.loading) {
      contenido = (<FlatList
        keyExtractor={(item, index) => index+''}
        data={this.state.data}
        renderItem={({item,index}) => {
          return (<TouchableOpacity onPress={() => this.onPressHandler(item)}>
            <Text style={index%2===0?styles.ItemEven:styles.ItemUneven}>
              {item.title_long}
            </Text>
          </TouchableOpacity>);
        }}
        ListHeaderComponent={this.renderHeader}
      />);
    }
    return (
      <View>
        {contenido}
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  ItemEven: {
    backgroundColor: '#2B4B6F',
    textAlign: 'center',
    color:'white'
  },
  ItemUneven: {
    backgroundColor: '#D46A6A',
    textAlign: 'center',
    color:'white'
  }
});
