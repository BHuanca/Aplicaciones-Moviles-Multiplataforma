import React, {Component} from 'react';

class UserAdd extends Component{
	state = {
		name: ''
	}
	onChangeNameHandler = (ev) => {
		this.setState({
			name: ev.target.value
		});
	}
	onClick = () => {
		this.props.onClick({key:Math.random(),name:this.state.name});
		this.setState({name:''});
	}
	render(){
		return (<div>
			<input type="text" value={this.state.name} onChange={this.onChangeNameHandler} />
			<button
				onClick={this.onClick}>
				Agregar Usuario
			</button>
		</div>)
	}
}

export default UserAdd;