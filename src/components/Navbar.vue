<template>
    <b-navbar type="is-primary" :is-fixed-top="true" :centered="true" :spaced="true">
        <template slot="brand">
            <b-navbar-item href="http://www.karyon.com.br/">
                <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.LOGD2r3NMq9QW6hytEjrYgAAAA%26pid%3DApi&f=1"
                    alt="Karyon"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item tag="router-link" :to="{ path: '/cliente' }">
                Clientes
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/equipamento' }">
                Equipamento
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/fornecedor-equipamento' }">
                Fornecedores
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-grey" @click="logout()">
                        Log out
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>
<script>
export default {
    name: 'Navbar',
    data: function(){
        return {

        }
    },
    methods: {
        logout: function() {
            this.$store.dispatch('auth/logout')
            .then(() => {
                this.$router.push({ name: 'login' })
            })
            .catch(() => {
                this.$buefy.toast.open({
                    duration: 1500,
                    message: 'Erro no logout',
                    type: 'is-danger'
                })
            });
        }
    }
}
</script>