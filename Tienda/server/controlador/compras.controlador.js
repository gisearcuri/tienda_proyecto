import { Productos } from "../modelos/productos.modelos.js";

const comprasControlador = {
    comprar: async (req, res) => {
        const { carrito } = req.body;

        try {
        // 1️⃣ Validar stock
        for (const item of carrito) {
            const producto = await Productos.findById(item._id);

            if (!producto) {
            return res.status(404).json({
                message: "Producto no encontrado",
            });
            }

            if (producto.cantidad < item.cantidad) {
            return res.status(400).json({
                message: `Stock insuficiente para ${producto.nombre}`,
            });
            }
        }

        // 2️⃣ Descontar stock
        for (const item of carrito) {
            await Productos.findByIdAndUpdate(
            item._id,
            { $inc: { cantidad: -item.cantidad } }
            );
        }

        return res.status(200).json({
            message: "Compra realizada con éxito",
        });

        } catch (error) {
        return res.status(500).json({
            message: "Error al procesar la compra",
        });
        }
    },
};

export default comprasControlador;