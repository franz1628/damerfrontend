import { Zona, ZonaInit } from "../components/tablas/interfaces/zona.interface";
import { AgrupacionZonas, AgrupacionZonasInit } from "./agrupacionZonas";

export interface AgrupacionZonasDetalle {
    id: number,
    idAgrupacionZonas:number,
    idZona: number,
    fechaRegistro:string,
    fechaModificacion:string,
    estado:number,
    AgrupacionZonas:AgrupacionZonas
    Zona:Zona
}
export const AgrupacionZonasDetalleInit: AgrupacionZonasDetalle = {
    id: 0,
    idAgrupacionZonas:0,
    idZona:0,
    fechaRegistro: '',
    fechaModificacion: '',
    estado:1,
    AgrupacionZonas:AgrupacionZonasInit,
    Zona:ZonaInit
};