import auth from './auth.js';
import axios from 'axios';

const API_URL = "http://controle.karyon.com.br:8080/ControleKaryonAPI";

const equipmentModel = {

    "equipamento": {
        "id": 5
    },
    "status": "",
    "nrSerial": "",
    "observacao": "",
    "empresaDistribuidora": "",
    "dtCancelamento": "",
    "tipoSubstituicao": false,
    "idEquipamentoCliente": 1,
    "servidorCliente": null,
    "dtValidade": null,
    "faturadoPor": 0,
    "valorEquipamento": 0.0,
    "versaoDriver": "",
    "atualizarDriver": false,
    "versaoDriverAtualizacao": null,
    "estacao": null,
    "flagDiasSemExames": 0
}

const nullTranslator = {
    "string": "",
    "object": null,
    "number": 0
}

class APIData {

    getClients(){
        return axios.get(API_URL + '/cliente', {
            headers: auth.header()
        });
    }

    getClient(id){
        return axios.get(API_URL + '/cliente/' + id, {
            headers: auth.header()
        })
    }

    createClient(data){
        return axios.post(API_URL + '/client', {
            headers: auth.header(),
            data: data
        })
    }

    updateClient(id, data){
        return axios.put(API_URL + '/cliente/' + id, {
            headers: auth.header(),
            data: data
        })
    }

    getEquipments(){
        return axios.get(API_URL + '/equipamento', {
            headers: auth.header()
        })
    }

    getProviders(){
        return axios.get(API_URL + '/fornecedor-equipamento', {
            headers: auth.header()
        })
    }

    getProvider(id){
        return axios.get(API_URL + '/fornecedor-equipamento/' + id, {
            headers: auth.header()
        })
    }

    getClientEquipments(id){
        return axios.get(API_URL + '/equipamento-cliente/cliente/' + id, {
            headers: auth.header()
        })
    }

    createClientEquipment(id, data){
        //deep copy
        data = JSON.parse(JSON.stringify(data))

        //add attributes to object if necessary
        for(const key in equipmentModel){
            if( !(key in data) ){

                data[key] = nullTranslator[typeof(equipmentModel[key])]
            }
        }
        //set client id in 'equipamento' field
        data.equipamento={}
        data.equipamento.id = id;
        console.log(data)
        return axios.post(API_URL + '/equipamento-cliente/cliente/' + id, {
            headers: auth.header(),
            data: data
        })
    }

    updateClientEquipment(id, data){

        //deep copy
        data = JSON.parse(JSON.stringify(data))

        //add attributes to object if necessary
        for(const key in equipmentModel){
            if( !(key in data) ){

                data[key] = nullTranslator[typeof(equipmentModel[key])]
            }
        }

        data.equipamento={}
        data.equipamento.id = id;
        data.dtCancelamento = String(data.dtCancelamento)

        console.log(data)
        return axios.put(API_URL + '/equipamento-cliente/' + id, {
            headers: auth.header(),
            data: data
        })
    }
}

export default new APIData();