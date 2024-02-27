import { Categoria, CategoriaInit } from "../components/variedades/interfaces/categoria.interface";
import { UnidadVenta, UnidadVentaInit } from "./unidadVenta";


export interface CategoriaUnidadVenta {
    id: number,
    idCategoria:number,
    idUnidadVenta:number,
    idTipoUnidadMedida:number,
    idUnidadMedida:number,
    Categoria:Categoria,
    UnidadVenta:UnidadVenta,
    estado: number,
    fechaRegistro:Date
}
export const CategoriaUnidadVentaInit: CategoriaUnidadVenta = {
    id: 0,
    idCategoria:0,
    idUnidadVenta:0,
    idTipoUnidadMedida:0,
    idUnidadMedida:0,
    Categoria:CategoriaInit,
    UnidadVenta:UnidadVentaInit,
    estado: 1,
    fechaRegistro:new Date()
};