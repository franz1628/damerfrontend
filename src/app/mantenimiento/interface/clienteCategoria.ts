import { Categoria, CategoriaInit } from "../components/variedades/interfaces/categoria.interface";
import { Cliente, ClienteInit } from "./cliente";

export interface ClienteCategoria {
    id: number,
    codCliente: number,
    codCategoria: number,
    nombreAgrupacion: string,
    fechaRegistro: Date,
    Cliente: Cliente,
    Categoria: Categoria

}
export const ClienteCategoriaInit: ClienteCategoria = {
    id: 0,
    codCliente: 0,
    codCategoria: 0,
    nombreAgrupacion: '',
    fechaRegistro: new Date(),
    Cliente: ClienteInit,
    Categoria: CategoriaInit
};