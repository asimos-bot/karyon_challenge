import axios from 'axios';

const API_URL = "http://controle.karyon.com.br:8080/ControleKaryonAPI"

class Authentication {
    login(creds) {
        return axios
                    .post(API_URL + '/login', {
                        email: creds.email,
                        senha: creds.password
                    })
                    .then(response => {
                        if( response.data.accessToken ) {
                            localStorage.setItem('user', JSON.stringify(response.data));
                        }

                        return response.data;
                    })
    }

    logout(){
        localStorage.removeItem('user');
    }

    header(){
        let user = JSON.parse(localStorage.getItem('user'));

        return user && user.accessToken ?
            { Authorization: 'Bearer ' + user.accessToken } :
            {};
    }
}

export default new Authentication();