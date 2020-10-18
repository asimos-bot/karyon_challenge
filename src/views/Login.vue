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
                    <b-button class="is-primary" @click="submit()">
                        Login
                    </b-button>
                </b-field>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        submit: function(){

            this.$store.dispatch('auth/login', {
                email: this.email,
                password: this.password
            }, {root: true}).then(() => {
                this.$router.push('/clients');
            }).catch(() => {
                this.$buefy.toast.open({
                    duration: 1500,
                    message: 'Credenciais inválidas',
                    type: 'is-danger'
                })
            });
        }
    }
}
</script>

<style lang="scss">
@import "../styles/theme.scss";
$top-gap: 20vh;
#login {
    margin: $top-gap auto;
}
@media (max-width: 400px)  {
    #login {
        margin: $top-gap 0;
        max-width: 98vw;
    }
}
</style>