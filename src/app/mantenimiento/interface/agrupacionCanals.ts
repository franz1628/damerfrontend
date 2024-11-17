import { Categoria, CategoriaInit } from "../components/variedades/interfaces/categoria.interface";
import { Cliente, ClienteInit } from "./cliente";
import { TipoUnidadMedida, TipoUnidadMedidaInit } from "./tipoUnidadMedida";
import { UnidadMedida, UnidadMedidaInit } from "./unidadMedida";

export interface AgrupacionCanals {
    id: number,
    descripcion: string,
    fechaRegistro:Date,
    estado:number
}
export const AgrupacionCanalsInit: AgrupacionCanals = {
    id: 0,
    descripcion: '',
    fechaRegistro:new Date(),
    estado:1
};