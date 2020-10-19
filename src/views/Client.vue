<template>
    <section>
        <b-modal 
            v-model="isModalActive"
            has-modal-card
            trap-focus
            :destroy-on-hide=true
            aria-role="dialog"
            aria-modal>
            <template #default="props">
                <EquipmentForm
                    :equipment="formProps.equipment"
                    :create="create"
                    :equipmentID="equipmentID"
                    @close="props.close">
                </EquipmentForm>
            </template>
        </b-modal>
        <div class="container has-background-primary" v-if="client">
                <b-button type="is-white" @click="callModalForCreation()">
                    Registrar Equipamento
                </b-button>
        </div>
        <div class="container has-background-primary">
            <b-table
                id="table"

                :data="equipments"
                :bordered=true
                :narrowed=true
                :paginated=true
                :striped=true
                per-page=9
                :current-page="currentPage"
                pagination-position="bottom"
                default-sort-direction="asc"
                sort-icon="arrow-up"
                sort-icon-size="is-medium"
                default-sort="equipment.id"
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
                    
                    <a @click="callModalForUpdate(props.row.id)">
                        {{ props.row.equipamento }}
                    </a>
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
import EquipmentForm from '../components/EquipmentForm';
export default {
    name: 'clients',
    data() {
        return {
            create: true,
            isModalActive: false,
            equipmentID: null,
            currentPage: 1,
            equipments: [],
            client: {},
            formProps: {
                equipment: {}
            }
        }
    },
    methods:{
        callModalForCreation(){
            this.create = true;
            this.isModalActive = true;
        },
        callModalForUpdate(equipmentID){
            this.create = false;
            this.isModalActive = true;
            this.equipmentID = equipmentID;
        }
    },
    components: {
        EquipmentForm
    },
    mounted() {

        APIdata.getClient(this.$route.params.id)
        .then(response => {
            this.client = response.data;
            this.equipments = this.client.lstEquipamentoCliente.map((obj)=>obj.equipamento);
            console.log(this.equipments)
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