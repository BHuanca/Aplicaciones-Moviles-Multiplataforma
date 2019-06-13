import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://192.168.43.205:5000'
	//baseURL: 'http://192.168.43.21:5000'
});

export default instance;
