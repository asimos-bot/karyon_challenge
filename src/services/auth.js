import axios from 'axios';

const API_URL = "http://controle.karyon.com.br:8080/ControleKaryonAPI";

class Authentication {

    login(creds) {
        return axios
                    .post(API_URL + '/login', {
                        email: creds.email,
                        senha: creds.password
                    })
                    .then(response => {
                        if( response.data.token ) {
                            localStorage.setItem('jwt', JSON.stringify(response.data));
                        }

                        return response.data;
                    })
    }

    logout(){
        localStorage.removeItem('jwt');
    }

    header(){
        let user = JSON.parse(localStorage.getItem('jwt'));

        return user && user.token ?
            { Authorization: user.type + user.token } :
            {};
    }
}

export default new Authentication();