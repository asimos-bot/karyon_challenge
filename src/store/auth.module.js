import AuthService from '../services/auth.js';

const user = JSON.parse(localStorage.getItem('user'));

const initState = { user };

export const auth = {
    namespaced: true,
    state: initState,
    mutations: {
        loginSuccess(state, user) {
            state.user = user;
        },
        loginFailure(state) {
            state.user = null;
        },
        logout(state) {
            state.user = null;
        }
    },
    actions: {
        login({ commit }, user) {
            return AuthService.login(user)
            .then(
                user => {
                    commit('loginSucess', user);
                    return Promise.resolve(user);
            })
            .catch(
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
            });
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        }
    }
}