import React, {Component} from 'react';

import UserTable from '../../components/UserTable/UserTable';
import UserCounter from '../../components/UserCounter/UserCounter';
import UserAdd from '../../components/UserAdd/UserAdd';

class UserList extends Component{
	state = {
		users: []
	}
	onCreateUserHandler = (newUser) => {
		this.setState({
			users: [...this.state.users,newUser]
		});
	}
	onDeleteUserHandler = (userId) => {
		this.setState({
			users: this.state.users.filter(it => it.key!==userId)
		});
	}
	render(){
		return (<div>
			<h1>Listado de usuarios</h1>
			<UserCounter counter={this.state.users.length} />
			<UserAdd onClick={this.onCreateUserHandler} />
			<UserTable users={this.state.users} onClick={this.onDeleteUserHandler} />
		</div>)
	}
}

export default UserList;