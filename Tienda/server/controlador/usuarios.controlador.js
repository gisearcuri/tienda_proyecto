import { Usuario } from "../modelos/usuarios.modelos.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET;

const usuarioControlador = {

    getAll: async (req, res) => {
        try {
            const todosUsuarios = await Usuario.find();
            return res.status(200).json(todosUsuarios);
        } catch (e) {
            return res.status(500).json(e);
        }
    },

    createOne: async (req, res) => {
        const { nombre, apellido, email, contrasena, confirmarContrasena, role } = req.body;
        const nuevoArray = { nombre, apellido, email, contrasena, confirmarContrasena,role }
        try{
            const nuevoUsuario = await Usuario.create(nuevoArray)

            const saveToken = {
                nombre: nuevoUsuario.nombre,
                apellido: nuevoUsuario.apellido,
                role: nuevoUsuario.role,
                email: nuevoUsuario.email,
                id: nuevoUsuario._id
            }
            jwt.sign(saveToken, SECRET, { expiresIn: "10m" }, (err, token) => {
                return res.status(201).json({ token })})
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
    deleteOne: async (req,res)=>{
        const id = req.params.id;
        try{
            const borrarUsuario = await Usuario.findByIdAndDelete(id)
            if(!borrarUsuario){
                return res.status(404).json({message: "El usuario no existe"})
            }
            res.status(201).json({message: "El usuario fue eliminado con exito."})
        }catch(e){
            return res.status(400).json(e)
        }
    },

    login: async (req, res) => {
        const { email, contrasena } = req.body;

        const usuarioRecurrente = await Usuario.findOne({ email });
        if (!usuarioRecurrente) {
            return res.status(404).json({ errors: { email: "El email es incorrecto o no existe en la BD" } });
        }

        const bcryptRespuesta = await bcrypt.compare(
            contrasena,
            usuarioRecurrente.contrasena
        );

        if (!bcryptRespuesta) {
            return res.status(404).json({ errors: { contrasena: "Contraseña incorrecta" } });
        }

        const payload = {
            nombre: usuarioRecurrente.nombre,
            apellido: usuarioRecurrente.apellido,
            role: usuarioRecurrente.role,
            email: usuarioRecurrente.email,
            id: usuarioRecurrente._id
        };

        jwt.sign(payload, SECRET, { expiresIn: "10m" }, (err, token) => {
            if (err) return res.status(500).json({ error: "Error generando token" });
            return res.status(200).json({ token });
        });
    }
};

export default usuarioControlador;