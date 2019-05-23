import React, { Fragment } from 'react';

import { Modal, View, Button } from 'react-native';
import Icon from 'react-native-ionicons';

import { AsyncStorage } from '@react-native-community/async-storage';
import { GiftedChat } from 'react-native-gifted-chat';

export default class ChatScreen extends React.Component {
	user = {
		avatar:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Gnome-stock_person_bot.svg/1024px-Gnome-stock_person_bot.svg.png'
	};
	state = {
		messages: [],
		userId: null,
		modalVisible: false
	};
	async componentDidMount() {
		this.socket = global.socket;
		this.socket.on('message', this.onReceivedMessage);
		const userId = await AsyncStorage.getItem('userId');
		this.setState({ userId: userId });
	}

	async componentWillMount() {
		this.setState({
			messages: [
				{
					_id: 1,
					text: 'Hola, como estas!',
					createdAt: new Date(),
					user: {
						_id: 2,
						name: 'React Native',
						avatar:
							'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Gnome-stock_person_bot.svg/1024px-Gnome-stock_person_bot.svg.png'
					}
				}
			]
		});
	}

	onReceivedMessage = messages => {
		this._storeMessages(messages);
	};
	onSend = (messages = []) => {
		this.socket.emit('message', messages[0]);
		this._storeMessages(messages);
	};
	_storeMessages = messages => {
		this.setState(previousState => {
			return {
				messages: GiftedChat.append(previousState.messages, messages)
			};
		});
	};
	settingsHandler = () => {
		this.setState({ modalVisible: true });
	};
	chatHandler = () => {
		this.setState({ modalVisible: false });
	};
	backHandler = () => {
		this.setState({ modalVisible: false }, () => {
			this.props.navigation.navigate('Home');
		});
	};
	render() {
		const user = {
			_id: this.state.userId || -1,
			avatar: this.user.avatar
		};
		return (
			<Fragment>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
					transparent={true}
				>
					<View style={{ marginTop: 210 }}>
						<Button
							onPress={this.chatHandler}
							title="Regresar al Chat"
							color="#841584"
						/>
						<Button
							onPress={this.backHandler}
							title="Regresar al Inicio"
							color="red"
						/>
					</View>
				</Modal>

				<GiftedChat
					placeholder="Escribe algo..."
					renderActions={() => {
						return (
							<Icon
								color="#fff"
								style={{
									padding: 5,
									alignItems: 'center',
									backgroundColor: '#46494f',
									opacity: 0.8,
									height: 40
								}}
								size={25}
								name={'md-settings'}
								onPress={this.settingsHandler}
							/>
						);
					}}
					messages={this.state.messages}
					onSend={this.onSend}
					user={user}
				/>
			</Fragment>
		);
	}
}
