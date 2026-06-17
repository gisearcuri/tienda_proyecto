import {mongoose} from 'mongoose'
import bcrypt from 'bcrypt'

const usuarioSchema =  mongoose.Schema(
    {
        nombre: {
            type : String,
            required : [true, "El nombre es obligatorio"],
            minlength : [3, "El nombre debe tener al menos 3 caracteres"],
        },
        apellido : {
            type : String,
            required : [true, "El apellido es obligatorio"],
            minlength : [3, "El apellido debe tener al menos 3 caracteres"],
        },
        email : {
            type : String,
            required : [true, "El email debe ser agregado"],
            unique : true
        },
        contrasena : {
            type : String,
            required : [true, "La contraseña es obligatoria"],
            minlength : [8, "La contraseña debe tener al menos 8 caracteres"]
        },
        role: {
            type: String,
            enum: ["usuario", "administrador"], 
            default: "usuario",
            },
    }, {timestamps : true}
)

usuarioSchema.virtual('confirmarContrasena').get(
    function(){
        return this._confirmarContrasena;
    }
).set(function(value){
    this._confirmarContrasena = value;
});

usuarioSchema.pre('validate', function(next){
    if(this.contrasena !== this.confirmarContrasena){
        this.invalidate('confirmarContrasena' , 'Las contraseñas son diferentes')
    }
    next();
})

usuarioSchema.pre('save',function(next){
    bcrypt.hash(this.contrasena,10).then((encryptedPass)=>{
        this.contrasena = encryptedPass;
        next();
    })
})

const Usuario = mongoose.model('usuario' , usuarioSchema)

export {Usuario, usuarioSchema}