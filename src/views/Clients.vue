<template>
    <section>
        <div class="container has-background-primary">
            <b-table
                id="table"

                :data="facelabClients"
                :bordered=true
                :narrowed=true
                :paginated=true
                :striped=true
                per-page=13
                :current-page="currentPage"
                pagination-position="top"
                default-sort-direction="asc"
                sort-icon="arrow-up"
                sort-icon-size="is-medium"
                default-sort="client.id"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page">

                <b-table-column 
                    :centered=true
                    field="nomefantasia"
                    label="Nome" width="100"
                    sortable
                    v-slot="props">
                        <router-link :to="{ path: '/client/' + props.row.idCliente }">
                        {{ props.row.nomeFantasia }}
                        </router-link>
                </b-table-column>
    
                <b-table-column
                    :centered=true
                    field="idClient"
                    label="ID"
                    width="100"
                    sortable
                    numeric
                    v-slot="props">
                        <router-link :to="{ path: '/client/' + props.row.idCliente }">
                        {{ props.row.idCliente }}
                        </router-link>
                </b-table-column>

            </b-table>
        </div>
    </section>
</template>

<script>
import APIdata from '../services/APIdata';
export default {
    name: 'clients',
    data() {
        return {
            currentPage: 1,
            clients: [],
            columns: [
                {
                    field: 'nomeFantasia',
                    label: 'Nome',
                    searchable: true
                },
                {
                    field: 'idCliente',
                    label: 'ID',
                    searchable: true
                }
            ]
        }
    },
    computed: {
        facelabClients() {
            console.log(this.clients);
            return this.clients.filter(client => client && client.clienteFacelab); 
        }
    },
    mounted() {
        APIdata.getClients()
        .then(response => this.clients = response.data)
        .catch(() => {
            this.$buefy.toast.open({
                duration: 1500,
                message: 'Falha na conexão com servidor',
                type: 'is-danger'
            })
        })
    }
}
</script>
<style>
.container {
    padding: 10px
}
</style>