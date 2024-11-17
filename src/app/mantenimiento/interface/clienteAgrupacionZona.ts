import { AgrupacionZonas, AgrupacionZonasInit } from "./agrupacionZonas";
import { AgrupacionZonaZona } from "./agrupacionZonaZona";

export interface ClienteAgrupacionZona {
    id:number,
    idCliente: number,
    idAgrupacionZona:number,
    fechaRegistro:Date,
    estado:number,
    nombre:string,
    AgrupacionZonas: AgrupacionZonas
}
export const ClienteAgrupacionZonaInit: ClienteAgrupacionZona = {
    id:0,
    idCliente: 0,
    idAgrupacionZona:0,
    fechaRegistro:new Date(),
    nombre:'',
    estado:1,
    AgrupacionZonas : AgrupacionZonasInit
};