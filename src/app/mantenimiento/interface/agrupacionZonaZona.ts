import { Zona, ZonaInit } from "../components/tablas/interfaces/zona.interface";


export interface AgrupacionZonaZona {
    id: number,
    idClienteAgrupacionZona: number,
    idZona: number,
    fechaRegistro:Date,
    estado:number,
    Zona:Zona
}
export const AgrupacionZonaZonaInit: AgrupacionZonaZona = {
    id: 0,
    idClienteAgrupacionZona: 0,
    idZona: 0,
    fechaRegistro:new Date(),
    estado:1,
    Zona:ZonaInit
};