import axios from "axios";

const BASE_URL = "http://localhost:8000/api/productos";


    export const getProductos = async () => {
        const res = await axios.get(BASE_URL);
        return res.data;
    };

    export const getProductoById = async (id) => {
        const res = await axios.get(`${BASE_URL}/${id}`);
        return res.data;
    };

    export const crearProducto = async (data, token) => {
        const res = await axios.post(BASE_URL, data, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    };

    export const eliminarProducto = async (id, token) => {
        const res = await axios.delete(`${BASE_URL}/${id}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
    return res.data;
    };

    export const actualizarProducto = async (id, data, token) => {
        const res = await axios.put(`${BASE_URL}/${id}`, data, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
    return res.data;
};
    export const getProductosPorCategoria = async (slug) => {
        const res = await axios.get(`${BASE_URL}/categoria/${slug}`);
        return res.data;
    };