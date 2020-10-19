<template>
    <form action="">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">
                    {{ create ? "Create" : "Edit    " }}
                </p>
                <button
                    type="button"
                    class="delete"
                    @click="$emit('close')"/>
            </header>
            <section class="modal-card-body">
                
                <b-field
                    v-if="equipment.status == 'CA'"
                    label="Data do Cancelamento"
                    label-position="on-border"
                    required>
                        <b-datetimepicker v-model="equipment.dtCancelamento">
                        </b-datetimepicker>
                </b-field>
                
                <b-field label="Distribuidora" label-position="on-border">
                    <b-select
                        v-model="equipment.empresaDistribuidora"
                        required>
                            <option
                                v-for="provider in providers"
                                :value="provider.descricao"
                                :key="provider.id">
                                    {{ provider.descricao }}
                            </option>
                    </b-select>
                </b-field>

                <b-field label="Status" label-position="on-border">
                    <b-select
                        v-model="equipment.status"
                        required>
                            <option
                                v-for="status in possibleStatus"
                                :value="status.real"
                                :key="status.description">
                                    {{ status.description }}
                            </option>
                    </b-select>
                </b-field>

                <b-field label="Tipo de Substituição" label-position="on-border">
                    <b-input
                        :lazy=true
                        v-model="equipment.tipoSubstituicao"
                        required>
                    </b-input>
                </b-field>

                <b-field label="Número Serial" label-position="on-border">
                    <b-input
                        :lazy=true
                        v-model="equipment.nSerial">
                    </b-input>
                </b-field>

                <b-field>
                    <b-switch v-model="equipment.atualizarDriver" size="is-small">
                        <a class="title is-7">Atualizar Driver</a>
                    </b-switch>
                </b-field>

                <b-field
                    v-if="equipment.atualizarDriver"
                    label="Versão Atualizada do Driver"
                    label-position="on-border">
                        <b-input
                            :lazy=true
                            v-model="equipment.observacao">
                        </b-input>
                </b-field>

                <b-field label="Observação" label-position="on-border">
                    <b-input
                        :lazy=true
                        v-model="equipment.observacao">
                    </b-input>
                </b-field>

                <b-field label="Estação" label-position="on-border">
                    <b-input
                        :lazy=true
                        v-model="equipment.estacao">
                    </b-input>
                </b-field>

            </section>
            <footer class="modal-card-foot">
                <button class="button is-primary" @click.prevent="send()">
                    {{ create ? "Submit" : "Edit" }}
                </button>
            </footer>
        </div>
    </form>
</template>
<script>
import APIdata from '../services/APIdata';
export default {
    data: function() {
        return {
            providers: [],
            possibleStatus: [
                {
                    'description': 'Solicitado',
                    'real': 'SO'
                },
                {
                    'description': 'Cancelado',
                    'real': 'CA'
                },
                {
                    'description': 'Em Utilização',
                    'real': 'EU'
                },
            ] 
        }
    },
    props: {
        equipment:{
            required: true,
            type: Object
        },
        create: {
            type: Boolean,
            default: true
        },
        equipmentID:{
            required: false,
            type: Number
        }
    },
    methods: {
        send() {
            let clientID = this.$route.params.id
            if( this.create ){
                APIdata.createClientEquipment(clientID, this.equipment)
                .then((res) => {
                    console.log(res.data)
                    this.$buefy.toast.open({
                        duration: 1500,
                        message: 'Equipamento registrado com sucesso',
                        type: 'is-sucess'
                    })
                })
                .catch((error)=>{
                    console.log(error)
                    this.$buefy.toast.open({
                        duration: 1500,
                        message: 'Erro no registro do equipamento',
                        type: 'is-danger'
                    })
                })
            }else{
                APIdata.updateClientEquipment(this.equipmentID, this.equipment)
                .then((res) => {
                    console.log(res.data)
                    this.$buefy.toast.open({
                        duration: 1500,
                        message: 'Equipamento atualizado com sucesso',
                        type: 'is-sucess'
                    })
                })
                .catch((error)=>{
                    console.log(error)
                    this.$buefy.toast.open({
                        duration: 1500,
                        message: 'Erro na atualização do equipamento',
                        type: 'is-danger'
                    })
                })
            }
        }
    },
    mounted() {
        APIdata.getProviders()
        .then((res) => {
            this.providers = res.data;
            console.log(this.providers)
        })
    }
}
</script>