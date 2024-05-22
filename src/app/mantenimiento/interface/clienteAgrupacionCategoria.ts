import { AgrupacionCategoriaCategoria, AgrupacionCategoriaCategoriaInit } from "./agrupacionCategoriaCategoria";

export interface ClienteAgrupacionCategoria {
    id:number,
    idCliente: number,
    fechaRegistro:Date,
    estado:number,
    AgrupacionCategoriaCategoria: AgrupacionCategoriaCategoria[]
}
export const ClienteAgrupacionCategoriaInit: ClienteAgrupacionCategoria = {
    id:0,
    idCliente: 0,
    fechaRegistro:new Date(),
    estado:1,
    AgrupacionCategoriaCategoria : []
};