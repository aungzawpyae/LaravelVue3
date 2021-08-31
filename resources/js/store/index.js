import {createApp} from 'vue';
import Vuex from 'vuex';
createApp(Vuex);

import auth from './modules/auth'

export default new Vuex.Store({
	modules: {
		auth
	},
	strict: true
})