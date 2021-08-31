

export default {
	token: localStorage.getItem('token') ? localStorage.getItem('token') : "",
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
    tokenType: localStorage.getItem('tokenType') ? localStorage.getItem('tokenType') : '',
    auth: localStorage.getItem('auth') ? localStorage.getItem('auth') : false,
}