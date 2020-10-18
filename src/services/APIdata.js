import auth from './auth.js';
import axios from 'axios';

const API_URL = "http://controle.karyon.com.br:8080/ControleKaryonAPI";

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
        return axios.post(API_URL + '/equipamento-cliente/cliente/' + id, {
            headers: auth.header(),
            data: data
        })
    }

    updateClientEquipment(id, data){
        return axios.put(API_URL + '/equipamento-cliente/' + id, {
            headers: auth.header(),
            data: data
        })
    }
}

export default new APIData();