import mongoose, { Mongoose } from "mongoose";
import slugify from "slugify";

const categoriaSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            unique: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        activa: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
)
categoriaSchema.pre("validate", function (next) {
    if (this.isModified("nombre")) {
        this.slug = slugify(this.nombre, {
            lower: true,  
            strict: true  
        });
    }
    next();
});

const Categoria = mongoose.model('categorias', categoriaSchema)
export {Categoria, categoriaSchema}