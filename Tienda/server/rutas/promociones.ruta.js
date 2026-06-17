import express from "express";
import promocionesControlador from "../controlador/promociones.controlador.js";

const rutasPromociones = express.Router();

rutasPromociones.get("/", promocionesControlador.getAll);
rutasPromociones.get("/:id", promocionesControlador.getOne);
rutasPromociones.post("/", promocionesControlador.createOne);
rutasPromociones.put("/:id", promocionesControlador.updateOne);
rutasPromociones.delete("/:id", promocionesControlador.deleteOne);

export default rutasPromociones;