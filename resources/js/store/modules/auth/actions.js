import {USER, SET_USER, LOGOUT} from "./mutation-types";
import helper from '../../../utils/helper';
import Api from "../../../utils/api";
import {router} from '../../../plugins/vue-router';

export const login = ({ commit }, payload) => {
	Api.poster("api/login", payload)
	.then((response) => {
        commit(SET_USER, response.data);
    })
};

export const set_user = ({ commit }, data) => {
    commit(SET_USER, data)
};

export const logout = ({commit}) =>{
  	commit(LOGOUT)
  	router.push({
		name: 'login'
  	});
}

export default {
    set_user,
    login,
    logout
};