import { Categoria, CategoriaInit } from "../components/variedades/interfaces/categoria.interface";
import { Cliente, ClienteInit } from "./cliente";
import { TipoUnidadMedida, TipoUnidadMedidaInit } from "./tipoUnidadMedida";
import { UnidadMedida, UnidadMedidaInit } from "./unidadMedida";

export interface AgrupacionZonas {
    id: number,
    descripcion: string,
    descripcionResumida: string,
    tip: string,
    idTipoAgrupacion1: number,
    idTipoAgrupacion2: number,
    idTipoAgrupacion3: number,
    alias1: string,
    alias2: string,
    alias3: string,
    fechaRegistro:Date,
    estado:number
}
export const AgrupacionZonasInit: AgrupacionZonas = {
    id: 0,
    descripcion: '',
    descripcionResumida: '',
    tip: '',
    idTipoAgrupacion1: 0,
    idTipoAgrupacion2: 0,
    idTipoAgrupacion3: 0,
    alias1: '',
    alias2: '',
    alias3: '',
    fechaRegistro:new Date(),
    estado:1


};