import {Router} from 'express'
import usuarioControlador from '../controlador/usuarios.controlador.js'

const usuarioRuta = Router();

usuarioRuta.get('/', usuarioControlador.getAll)
usuarioRuta.post('/nueva', usuarioControlador.createOne)
usuarioRuta.post('/login',usuarioControlador.login)
usuarioRuta.delete('/:id', usuarioControlador.deleteOne)

export default usuarioRuta