import {Router} from "express"
import productosControlador from "../controlador/productos.controlador.js"
import validateToken from "../middleware/validateToken.js";

const rutasProductos = Router();

rutasProductos.get("/categoria/:slug",  productosControlador.productosPorCategoria)
rutasProductos.get('/', productosControlador.getAll )
rutasProductos.post('/', validateToken , productosControlador.createOne)
rutasProductos.get('/:id', productosControlador.getOne)
rutasProductos.delete('/:id',validateToken , productosControlador.deleteOne)
rutasProductos.put('/:id', validateToken , productosControlador.updateOne)

export default rutasProductos; 