import { Router } from "express";
import comprasControlador from "../controlador/compras.controlador.js";

const comprasRuta = Router();

comprasRuta.post("/", comprasControlador.comprar);

export default comprasRuta;