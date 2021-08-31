import {USER, SET_USER, LOGOUT} from "./mutation-types";

export default {
	[SET_USER](state, data) {
		state.user = data.user;
		state.tokenType = data.type;
		state.token = data.token;
		state.auth = data.auth;

		
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('tokenType', data.type);
        localStorage.setItem('token', data.token)
        localStorage.setItem('auth', true);
        
	},

	[LOGOUT](state){
		state.user = {};
		state.tokenType = "";
		state.token = "";
		state.auth = false;

	    localStorage.removeItem('user')
	    localStorage.removeItem('tokenType')
	    localStorage.removeItem('token')
	    localStorage.removeItem('auth')	    
	}
};