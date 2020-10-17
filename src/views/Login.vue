<template>
    <section class="columns is-mobile is-centered">
        <div class="box" id="login">
            <div class="column">
                <b-field label="Email" label-position="on-border">
                    <b-input type="email"
                    :lazy=true
                    v-model="email"
                    maxlength=150
                    validation-message="Por favor insira um endereço de email válido"
                    required>
                    </b-input>
                </b-field>

                <b-field label="Password" label-position="on-border">
                    <b-input type="password"
                    :lazy=true
                    v-model="password"
                    validation-message="Por favor insira uma senha"
                    password-reveal
                    required>
                    </b-input>
                </b-field>

                <b-field class="has-text-centered">
                    <b-button class="is-primary" @click="login()">
                        Login
                    </b-button>
                </b-field>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login: function(){
            axios
                .post("http://controle.karyon.com.br:8080/ControleKaryonAPI/login", {
                    email: "teste",
                    senha: "123456"
                })
                .then(response => {
                    if(response.data.accessToken){
                        console.log("aqui o access token: ", JSON.stringify(response.data))
                    }
                })
                .catch(error => {
                    console.log("here is the error: ", error)
                });
        }
    }
}
</script>

<style lang="scss">
@import "../styles/theme.scss";
#login {
    margin: 30px auto;
}
@media (max-width: 400px)  {
    #login {
        margin: 30px 0;
        max-width: 98vw;
    }
}
</style>