import mongoose, { Mongoose } from "mongoose";

const productosSchema = mongoose.Schema(
    {
        nombre :{
            type : String,
            minlength :[3, "Requerido, entre 3 y 15 caracteres."],
            maxlength :[15, "Requerido, entre 3 y 15 caracteres."],
            required :[true, "El producto debe tener un nombre."],
        },
        descripcion : {
            type: String,
            required : [true, "Describe el producto."],
            minlength : [10, "Requerido, entre 10 y 255 caracteres."],
            maxlength : [255, "Requerido, entre 10 y 255 caracteres."]
        },
        categoria: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "categorias",
            required: true
            },
        url : {
            type : [String],
        },
        precio : {
        type: Number, 
        required: [true, "El producto debe tener un precio"],
        },
        cantidad : {
            type : Number  ,
            required : [true, "Agregar cantidad"]
        },
        codigo : {
        type: Number, 
        required: [true, "El producto debe tener un numero de identificacion"],
        },
    },
    {timestamps : true}
)

const Productos = mongoose.model('productos',productosSchema)

export {Productos,productosSchema};