import { Categoria, CategoriaInit } from "../components/variedades/interfaces/categoria.interface";

export interface AgrupacionCategoriaCategoria {
    id: number,
    idClienteAgrupacionCategoria: number,
    idCategoria: number,
    fechaRegistro:Date,
    estado:number,
    Categoria:Categoria
}
export const AgrupacionCategoriaCategoriaInit: AgrupacionCategoriaCategoria = {
    id: 0,
    idClienteAgrupacionCategoria: 0,
    idCategoria: 0,
    fechaRegistro:new Date(),
    estado:1,
    Categoria:CategoriaInit
};