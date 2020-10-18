import AuthService from '../services/auth.js';

const user = JSON.parse(localStorage.getItem('jwt'));

// if in development mode, give us a mock authentication
const initState = { user };

export const auth = {
    namespaced: true,
    state: initState,
    mutations: {
        LOGIN_SUCESS(state, user) {
            state.user = user;
        },
        LOGIN_FAILURE(state) {
            state.user = null;
        },
        LOGOUT(state) {
            state.user = null;
        }
    },
    actions: {
        login({ commit }, user) {
            return AuthService.login(user)
            .then(
                user => {
                    commit('LOGIN_SUCESS', user);
                    return Promise.resolve(user);
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