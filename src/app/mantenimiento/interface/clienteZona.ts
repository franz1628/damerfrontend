
import { Zona, ZonaInit } from "../components/tablas/interfaces/zona.interface";
import { Cliente, ClienteInit } from "./cliente";

export interface ClienteZona {
    id: number,
    idCliente: number,
    codZona: number,
    nombreAgrupacion: string,
    fechaRegistro: Date,
    Cliente: Cliente,
    Zona: Zona

}
export const ClienteZonaInit: ClienteZona = {
    id: 0,
    idCliente: 0,
    codZona: 0,
    nombreAgrupacion: '',
    fechaRegistro: new Date(),
    Cliente: ClienteInit,
    Zona: ZonaInit
};