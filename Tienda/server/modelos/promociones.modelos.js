import mongoose, { Mongoose } from "mongoose";

const promocionSchema = mongoose.Schema(
    {
        nombre: String,
        descuento: {
            type: Number, // ej: 20 = 20%
            required: true
        },
        productos: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "productos"
        }],
        activa: {
            type: Boolean,
            default: true
        },
        fechaInicio: Date,
        fechaFin: Date
    },
    { timestamps: true }
)

const Promocion = mongoose.model('promociones', promocionSchema)
export {Promocion, promocionSchema}