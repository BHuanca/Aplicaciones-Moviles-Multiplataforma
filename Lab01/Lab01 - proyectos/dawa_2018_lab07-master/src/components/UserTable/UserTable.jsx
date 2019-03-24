import React from 'react';

const userTable = (props) => {
	return (<ul>
		{props.users.map(item => (
			<li
				onClick={() => props.onClick(item.key)}
				key={item.key}>
					{item.key} - {item.name}
			</li>))}
	</ul>)
}

export default userTable;