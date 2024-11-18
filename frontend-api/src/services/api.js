import axios from "axios";

const API_URL = "http://localhost:3300"; // Cambiar si el servidor tiene otro puerto

// Funciones para obtener los datos
export const fetchApartamentos = async () => {
    return axios.get(`${API_URL}/apartamentos/apartamentos`);
};

export const fetchTorres = async () => {
    return axios.get(`${API_URL}/torres`);
};

export const fetchPropietarios = async () => {
    return axios.get(`${API_URL}/propietarios`);
};

export const fetchTarifas = async () => {
    return axios.get(`${API_URL}/tarifas`);
};

// Funciones para crear los datos
export const createApartamento = async (data) => {
    return axios.post(`${API_URL}/apartamentos/apartamentos`, data);
};

export const createTorre = async (data) => {
    return axios.post(`${API_URL}/torres`, data);
};

export const createPropietario = async (data) => {
    return axios.post(`${API_URL}/propietarios`, data);
};

export const createTarifa = async (data) => {
    return axios.post(`${API_URL}/tarifas`, data);
};

// Funciones para eliminar datos
export const deleteApartamento = async (id) => {
    return axios.delete(`${API_URL}/apartamentos/apartamentos/${id}`);
};

export const deleteTorre = async (id) => {
    return axios.delete(`${API_URL}/torres/${id}`);
};

export const deletePropietario = async (id) => {
    return axios.delete(`${API_URL}/propietarios/${id}`);
};

export const deleteTarifa = async (id) => {
    return axios.delete(`${API_URL}/tarifas/${id}`);
};
