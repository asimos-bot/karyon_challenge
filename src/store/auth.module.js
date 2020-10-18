import AuthService from '../services/auth.js';

const jwt = JSON.parse(localStorage.getItem('jwt'));

// if in development mode, give us a mock authentication
const initState = { jwt };

export const auth = {
    namespaced: true,
    state: initState,
    mutations: {
        LOGIN_SUCESS(state, jwt) {
            state.jwt = jwt;
        },
        LOGIN_FAILURE(state) {
            state.jwt = null;
        },
        LOGOUT(state) {
            state.jwt = null;
        }
    },
    actions: {
        login({ commit }, user) {
            return AuthService.login(user)
            .then(
                jwt => {
                    commit('LOGIN_SUCESS', jwt);
                    return Promise.resolve(jwt);
            })
            .catch(
                error => {
                    commit('LOGIN_FAILURE');
                    return Promise.reject(error);
            });
        },
        logout({ commit }) {
            AuthService.logout();
            commit('LOGOUT');
        }
    }
}