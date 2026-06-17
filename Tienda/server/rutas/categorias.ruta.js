import express from "express";
import categoriasControlador from "../controlador/categorias.controlador.js";

const rutasCategorias = express.Router();

rutasCategorias.get("/", categoriasControlador.getAll);
rutasCategorias.post("/", categoriasControlador.createOne);
rutasCategorias.put("/:id", categoriasControlador.updateOne);
rutasCategorias.delete("/:id", categoriasControlador.deleteOne);

export default rutasCategorias;