
import React from 'react';
import { 
    View, 
    Text, 
    ImageBackground, 
    TouchableOpacity, 
    ToastAndroid,
    KeyboardAvoidingView
} from 'react-native';

/*
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
*/

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Fumi } from 'react-native-textinput-effects';
import Icon from 'react-native-ionicons'
import axios from '../../lib/axios';

import imgBackground from '../../assets/img/background-login.jpg';

export default class SignInScreen extends React.Component {
    /*
    static navigationOptions = {
        title: 'Registrarse',
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            return <Ionicons name="ios-clipboard" size={25} color={tintColor} />;
        }
    };
    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };
    render() {
        return (
            <View>
                <Button title="Inicie sesion" onPress={this._signInAsync} />
            </View>
        );
    }*/

    static navigationOptions = {
        title: 'Registrarse',
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            return <Ionicons name="ios-clipboard" size={25} color={tintColor} />;
        }
    };
    state = {
        name: '',
        user: '',
        password: '',
        password2: '',
        loading: false,
        showPassword: false,
        showPassword2: false
    };
    showPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }
    showPassword2 = () => {
        this.setState({ showPassword2: !this.state.showPassword2 });
    }
    inputHandler = (field, value) => {
        this.setState({ [field]: value });
    };
    onSumitHandler = () => {
        if (
            this.state.user === '' ||
            this.state.name === '' ||
            this.state.password === ''
        ) {
            console.warn(this.state.user +' - '+this.state.name+' - '+this.state.password2);
            return ToastAndroid.showWithGravity (
                'Falta ingresar datos!',
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
        }
        if (this.state.password !== this.state.password2) {
            return ToastAndroid.showWithGravity (
                'Las contraseñas no coinciden',
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
        }
        this.setState({ loading: true });
        axios({
            method: 'POST',
            url: 'api/user/sigup',
            data: {
                email: this.state.user,
                username: this.state.user,
                password: this.state.password
            }
        })
        .then(async response => {
            ToastAndroid.showWithGravity(
                response.data.message,
                ToastAndroid.LONG,
                ToastAndroid.TOP
            );
            await AsyncStorage.setItem('userToken', reponse.data.token);
            this.props.navigation.navigate('App');
        })
        .catch(err => {
            ToastAndroid.showWithGravity(
                'Hubo un error en el registro',
                ToastAndroid.LONG,
                ToastAndroid.TOP
            );
            console.warn(err);
            this.setState({ loading: false });
        });
    };
    registerHandler = () => {
        this.props.navigation.navigate('SignIn');
    };
    render() {
        return (
            <View style={{ felx: 1 }}>
                <ImageBackground
                    source={imgBackground}
                    style={{ width: '100%', height: '100%' }}
                >
                    <KeyboardAvoidingView 
                        behavior="position"
                        style={{ justifyContent: 'center' }}
                        enabled
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: 48,
                                color: '#fff'
                            }}
                        >
                            Tecsup videos
                        </Text>
                        <View style={{ padding: 10 }}>
                            <View style={{ marginTop: 10 }}>
                                <View>
                                    <Fumi 
                                        style={{
                                            backgroundColor: '#46494f',
                                            opacity: 0.8,
                                            marginBottom: 10
                                        }}
                                        label={'Nombre'}
                                        iconClass={Icon}
                                        keyboardType="email-address"
                                        onChangeText={text => this.inputHandler('name', text)}
                                        value={this.state.name}
                                        iconName={'person'}
                                        iconColor={'#fff'}
                                        labelStyle={{ color: 'white' }}
                                        iconSize={30}
                                        iconWidth={40}
                                        inputPadding={16}
                                    />
                                </View>
                                <View>
                                    <Fumi 
                                        style={{
                                            backgroundColor: '#46494f',
                                            opacity: 0.8,
                                            marginBottom: 10
                                        }}
                                        label={'Usuario (email)'}
                                        iconClass={Icon}
                                        keyboardType="email-address"
                                        onChangeText={text => this.inputHandler('user', text)}
                                        value={this.state.user}
                                        iconName={'mail'}
                                        iconColor={'#fff'}
                                        labelStyle={{ color: 'white' }}
                                        iconSize={30}
                                        iconWidth={40}
                                        inputPadding={16}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Fumi 
                                        style={{
                                            backgroundColor: '#46494f',
                                            opacity: 0.8,
                                            width: '82%'
                                        }}
                                        label={'Contraseña'}
                                        secureTextEntry={true}
                                        labelStyle={{ color: 'white' }}
                                        onChangeText={text => this.inputHandler('password', text)}
                                        secureTextEntry={!this.state.showPassword}
                                        value={this.state.password}
                                        iconClass={Icon}
                                        iconName={'key'}
                                        iconColor={'#fff'}
                                        iconSize={30}
                                        iconWidth={40}
                                        inputPadding={16}
                                    />
                                    <Icon 
                                        color="#fff"
                                        style={{
                                            padding: 20,
                                            alignItems: 'center',
                                            backgroundColor: '#46494f',
                                            opacity: 0.8,
                                            height: 65
                                        }}
                                        size={25}
                                        name={this.state.showPassword ? 'md-eye' : 'md-eye-off'}
                                        onPress={this.showPassword}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Fumi 
                                        style={{
                                            backgroundColor: '#46494f',
                                            opacity: 0.8,
                                            width: '82%'
                                        }}
                                        label={'Confirmar contraseña'}
                                        secureTextEntry={true}
                                        labelStyle={{ color: 'white' }}
                                        onChangeText={text => this.inputHandler('password2', text)}
                                        secureTextEntry={!this.state.showPassword2}
                                        value={this.state.password2}
                                        iconClass={Icon}
                                        iconName={'key'}
                                        iconColor={'#fff'}
                                        iconSize={30}
                                        iconWidth={40}
                                        inputPadding={16}
                                    />
                                    <Icon 
                                        color="#fff"
                                        style={{
                                            padding: 20,
                                            alignItems: 'center',
                                            backgroundColor: '#46494f',
                                            opacity: 0.8,
                                            height: 65
                                        }}
                                        size={25}
                                        name={this.state.showPassword2 ? 'md-eye' : 'md-eye-off'}
                                        onPress={this.showPassword2}
                                    />
                                </View>
                                <TouchableOpacity
                                    onPress={this.onSumitHandler}
                                    style={{
                                        marginTop: 20,
                                        padding: 15,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 25,
                                        backgroundColor: '#dcdcdc'
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#46494f',
                                            fontSize: 15,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Registrar cuenta                            
                                    </Text>   
                                </TouchableOpacity>
                                <View
                                    style={{
                                        marginTop: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignSelf: 'center'
                                    }}
                                >
                                    <Text style={{ color: '#fff', fontSize: 14 }}>
                                        Ya tienes una cuenta?
                                        <Text
                                            onPress={this.registerHandler}
                                            style={{
                                                color: '#fff',
                                                fontSize: 16,
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {' '}
                                            Inicia sesion aqui
                                        </Text>
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>
        );
    }

}