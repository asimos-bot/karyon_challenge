<template>
    <section>
        <div class="container has-background-primary" v-if="client">
            <div class="columns is-multiline">
                <div id="info-box" v-for="info in clientFiltered" :key="info[0]">
                    <div v-if="info[1]">
                        <a class="title is-5">{{ info[0] }}: </a>
                        <a class="title is-6">{{ info[1] }}</a>
                    </div>
                </div>
            </div>
            <div class="container">
                <b-button type="is-white">
                    <router-link :to="{ name: 'new-client' }">
                        Registrar Equipamento
                    </router-link>
                </b-button>
            </div>
        </div>
        <div class="container has-background-primary">
            <b-table
                id="table"

                :data="equipments"
                :bordered=true
                :narrowed=true
                :paginated=true
                :striped=true
                per-page=5
                :current-page="currentPage"
                pagination-position="bottom"
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
                    field="equipamento"
                    label="Equipamento" width="100"
                    sortable
                    v-slot="props">
                    {{ props.row.equipamento }}
                </b-table-column>

                <b-table-column 
                    :centered=true
                    field="empresa"
                    label="Empresa" width="100"
                    sortable
                    v-slot="props">
                    {{ props.row.empresa }}
                </b-table-column>

                <b-table-column 
                    :centered=true
                    field="status"
                    label="Status" width="100"
                    sortable
                    v-slot="props">
                    {{ props.row.status }}
                </b-table-column>

                <b-table-column 
                    :centered=true
                    field="controleQualidade"
                    label="Controle de Qualidade" width="100"
                    sortable
                    v-slot="props">
                    {{ props.row.controleQualidade }}
                </b-table-column>

                <b-table-column 
                    :centered=true
                    field="conector"
                    label="Conector" width="100"
                    sortable
                    v-slot="props">
                    {{ props.row.conector }}
                </b-table-column>

                <b-table-column 
                    :centered=true
                    field="driver"
                    label="Driver" width="100"
                    sortable
                    v-slot="props">
                    {{ props.row.driver }}
                </b-table-column>

                <b-table-column 
                    :centered=true
                    field="setor"
                    label="Setor" width="100"
                    sortable
                    v-slot="props">
                    {{ props.row.setor }}
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
            id: null,
            currentPage: 1,
            equipments: [],
            client: {}
        }
    },
    computed: {
        clientFiltered(){
            let translator = {
                    "endereco": "Endereço",
                    "cidade": "Cidade",
                    "cnpj": "CNPJ",
                    "nomeFantasia": "Nome",
                    "email": "Email",
                    "razaoSocial": "Razão Social",
                    "telefone": "Telefone",
                    "uf": "UF"
            }
            //filter out empty values and prettify property names
            return  Object.entries(this.client).filter((entry) => {
                return translator[entry[0]]
            }).map((entry) => {

                entry[0] = translator[entry[0]]

                return [ entry[0], entry[1] ];
            })
        }
    },
    mounted() {
        this.id = this.$route.params.id

        APIdata.getClient(this.id)
        .then(response => {
            this.client = response.data
            this.equipments = this.client.lstEquipamentoCliente.map((obj)=>obj.equipamento);
            console.log(this.client)
        })
        .catch(() => {
            this.$buefy.toast.open({
                duration: 1500,
                message: 'Falha na conexão com servidor - Não foi possível obter dados do cliente',
                type: 'is-danger'
            })
        })
    }
}
</script>
<style>
.container {
    padding: 20px;
}
#info-box{
    margin: 10px;
}
</style>