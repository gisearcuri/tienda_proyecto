import { Promocion } from "../modelos/promociones.modelos.js";

const promocionesControlador = {

  // 🔹 Obtener todas las promociones
    getAll: async (req, res) => {
        try {
        const now = new Date();
        const promociones = await Promocion.find({
        activa: true,
        $or: [
            { fechaInicio: { $lte: now }, fechaFin: { $gte: now } },
            { fechaInicio: null, fechaFin: null }
        ]
        })
        .populate("productos", "nombre precio url")
        .sort({ createdAt: -1 });

        return res.status(200).json(promociones);
        } catch (e) {
        return res.status(400).json({ error: "Error al obtener promociones" });
        }
    },

    // 🔹 Obtener una promoción por ID
    getOne: async (req, res) => {
        try {
        const promo = await Promocion
            .findById(req.params.id)
            .populate("productos", "nombre precio url");

        if (!promo) {
            return res.status(404).json({ message: "Promoción no encontrada" });
        }

        return res.status(200).json(promo);
        } catch {
        return res.status(400).json({ error: "ID inválido" });
        }
    },

    // 🔹 Crear promoción
    createOne: async (req, res) => {
        const {
        nombre,
        descuento,
        productos = [],
        fechaInicio,
        fechaFin
        } = req.body;

        if (isNaN(descuento)) {
        return res.status(400).json({
            errors: { descuento: "El descuento debe ser numérico" }
        });
        }

        try {
        const nuevaPromo = await Promocion.create({
            nombre,
            descuento: Number(descuento),
            productos,
            fechaInicio,
            fechaFin
        });

        return res.status(201).json(nuevaPromo);
        } catch (e) {
        const messages = {};
        if (e.name === "ValidationError") {
            Object.keys(e.errors).forEach(key => {
            messages[key] = e.errors[key].message;
            });
        }
        return res.status(400).json({ errors: messages });
        }
    },

    // 🔹 Actualizar promoción
    updateOne: async (req, res) => {
        const dataToUpdate = {};
        const { nombre, descuento, productos, activa, fechaInicio, fechaFin } = req.body;

        if (nombre) dataToUpdate.nombre = nombre;
        if (productos) dataToUpdate.productos = productos;
        if (activa !== undefined) dataToUpdate.activa = activa;
        if (fechaInicio) dataToUpdate.fechaInicio = fechaInicio;
        if (fechaFin) dataToUpdate.fechaFin = fechaFin;

        if (descuento !== undefined) {
        if (isNaN(descuento)) {
            return res.status(400).json({
            errors: { descuento: "El descuento debe ser numérico" }
            });
        }
        dataToUpdate.descuento = Number(descuento);
        }

        try {
        const promoUpdated = await Promocion.findByIdAndUpdate(
            req.params.id,
            dataToUpdate,
            { new: true, runValidators: true }
        );

        if (!promoUpdated) {
            return res.status(404).json({ message: "Promoción no encontrada" });
        }

        return res.status(200).json(promoUpdated);
        } catch {
        return res.status(400).json({ error: "Error al actualizar promoción" });
        }
    },

    // 🔹 Eliminar promoción
    deleteOne: async (req, res) => {
        try {
        const deleted = await Promocion.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Promoción no encontrada" });
        }

        return res.status(200).json({ message: "Promoción eliminada con éxito" });
        } catch {
        return res.status(400).json({ error: "Error al eliminar promoción" });
        }
    }
};

export default promocionesControlador;