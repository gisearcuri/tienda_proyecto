import {Productos} from "../modelos/productos.modelos.js";
import {Categoria} from "../modelos/categorias.modelos.js"

const productosControlador = {

    getAll: async (req, res) => {
        try {
            const productos = await Productos.find().populate("categoria");
            res.status(200).json(productos);
        } catch (e) {
            res.status(400).json(e);
        }
    },

    productosPorCategoria: async (req, res) => {
        try {
            const { slug } = req.params;

            const categoria = await Categoria.findOne({ slug, activa: true });
            if (!categoria) {
                return res.status(404).json({ message: "Categoría no encontrada" });
        }

            const productos = await Productos
                .find({ categoria: categoria._id })
                .populate("categoria", "nombre slug");

            res.status(200).json(productos);
        } catch (e) {
            res.status(400).json({ error: "Error al obtener productos por categoría" });
        }
    },

    createOne: async (req, res) => {
        const { nombre, descripcion, categoria, url, precio, codigo, cantidad } = req.body;

            try {
                const nuevoProducto = await Productos.create({
                    nombre,
                    descripcion,
                    categoria,
                    url,
                    precio: Number(precio),
                    codigo: Number(codigo),
                    cantidad: Number(cantidad)
        });

        res.status(201).json(nuevoProducto);
        } catch (e) {
            const messages = {};
            if (e.name === "ValidationError") {
                Object.keys(e.errors).forEach(key => {
                    messages[key] = e.errors[key].message;
                });
            }
            res.status(400).json({ errors: messages });
        }
    },

    getOne: async (req, res) => {
        try {
            const producto = await Productos
            .findById(req.params.id)
            .populate("categoria");

            if (!producto) {
                return res.status(404).json({ message: "El id indicado no existe" });
            }

        res.status(200).json(producto);
        } catch {
            res.status(400).json({ error: "El servidor falló" });
        }
    },

    deleteOne: async (req, res) => {
        try {
            const deleted = await Productos.findByIdAndDelete(req.params.id);
            if (!deleted) {
                return res.status(404).json({ message: "El id no existe" });
            }
            res.status(200).json({ message: "Producto eliminado con éxito" });
        } catch (e) {
            res.status(400).json(e);
        }
    },

    updateOne: async (req, res) => {
        const { nombre, descripcion, categoria, url, precio, codigo, cantidad } = req.body;
        const data = {};

        if (nombre) data.nombre = nombre;
        if (descripcion) data.descripcion = descripcion;
        if (categoria) data.categoria = categoria;
        if (url) data.url = url;
        if (precio !== undefined) data.precio = Number(precio);
        if (codigo !== undefined) data.codigo = Number(codigo);
        if (cantidad !== undefined) data.cantidad = Number(cantidad);

        try {
        const updated = await Productos.findByIdAndUpdate(
            req.params.id,
            data,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "El id no existe" });
        }

        res.status(200).json(updated);
        } catch (e) {
        res.status(400).json(e);
        }
    }
};

export default productosControlador;