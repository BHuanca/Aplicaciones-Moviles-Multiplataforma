
import React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";

import axios from 'axios';

class HomeScreen extends React.Component {

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
    //alert(item.description_full);

    this.props.navigation.navigate('Descripcion', {
      titulo: item.title, descripcion: item.description_full,
      imagen: item.large_cover_image
    })
    this.props.navigation.navigate('Descripcion')

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

export default HomeScreen;


/*
import React from "react";
import {
  View,
  Text,
  Button
} from "react-native";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Hola mundo!</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

export default HomeScreen;
*/
