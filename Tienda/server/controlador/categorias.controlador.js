import { Categoria } from "../modelos/categorias.modelos.js";
import { Productos } from "../modelos/productos.modelos.js";

const categoriasControlador = {

    getAll: async (req, res) => {
        try {
        const categorias = await Categoria.find().sort({ nombre: 1 });
        res.status(200).json(categorias);
        } catch {
        res.status(400).json({ error: "Error al obtener categorías" });
        }
    },

    createOne: async (req, res) => {
        try {
        const nueva = await Categoria.create({ nombre: req.body.nombre });
        res.status(201).json(nueva);
        } catch (e) {
        res.status(400).json({ error: "La categoría ya existe" });
        }
    },

    updateOne: async (req, res) => {
        try {
        const updated = await Categoria.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        res.status(200).json(updated);
        } catch {
        res.status(400).json({ error: "Error al actualizar categoría" });
        }
    },

    deleteOne: async (req, res) => {
        try {
            const categoriaId = req.params.id;

            const productosAsociados = await Productos.findOne({
            categoria: categoriaId
            });

            if (productosAsociados) {
            return res.status(400).json({
                message: "No se puede eliminar la categoría porque tiene productos asociados"
            });
            }

            const deleted = await Categoria.findByIdAndDelete(categoriaId);

            if (!deleted) {
            return res.status(404).json({ message: "Categoría no encontrada" });
            }

            res.status(200).json({ message: "Categoría eliminada correctamente" });

        } catch (e) {
            res.status(400).json({ error: "Error al eliminar categoría" });
        }
    }
};

export default categoriasControlador;