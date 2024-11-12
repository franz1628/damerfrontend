import { AgrupacionZonaZona } from "./agrupacionZonaZona";

export interface ClienteAgrupacionZona {
    id:number,
    idCliente: number,
    fechaRegistro:Date,
    estado:number,
    nombre:string,
    AgrupacionZonaZona: AgrupacionZonaZona[]
}
export const ClienteAgrupacionZonaInit: ClienteAgrupacionZona = {
    id:0,
    idCliente: 0,
    fechaRegistro:new Date(),
    nombre:'',
    estado:1,
    AgrupacionZonaZona : []
};