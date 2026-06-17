import mongoose from "mongoose";

const compraSchema = mongoose.Schema(
    {
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: true,
            },
        productos: [
        {
            producto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Productos",
                required: true,
            },
            cantidad: {
                type: Number,
                required: true,
            },
            precio: {
                type: Number,
                required: true,
            },
        },
        ],
        total: {
            type: Number,
            required: true,
        },
        estado: {
            type: String,
            enum: ["pendiente", "pagada", "cancelada"],
            default: "pagada",
        },
    },
    { timestamps: true }
);
    const Compra = mongoose.model("compra", compraSchema);
export {Compra, compraSchema}