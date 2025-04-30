import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Cambia si tu backend corre en otro puerto

export const getProducts = () => axios.get(`${API_URL}/products`);
export const addProduct = (product) => axios.post(`${API_URL}/products`, product);
export const deleteProduct = (id) => axios.delete(`${API_URL}/products/${id}`);
export const updateProduct = (id, product) => axios.put(`${API_URL}/products/${id}`, product);

export const createSale = (items) => axios.post(`${API_URL}/sales`, { items });
