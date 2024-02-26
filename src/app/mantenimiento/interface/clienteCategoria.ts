import { Categoria, CategoriaInit } from "../components/variedades/interfaces/categoria.interface";
import { Cliente, ClienteInit } from "./cliente";

export interface ClienteCategoria {
    id: number,
    idCliente: number,
    idCategoria: number,
    nombreAgrupacion: string,
    fechaRegistro: Date,
    Cliente: Cliente,
    Categoria: Categoria

}
export const ClienteCategoriaInit: ClienteCategoria = {
    id: 0,
    idCliente: 0,
    idCategoria: 0,
    nombreAgrupacion: '',
    fechaRegistro: new Date(),
    Cliente: ClienteInit,
    Categoria: CategoriaInit
};