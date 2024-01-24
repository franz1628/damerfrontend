
import { Zona, ZonaInit } from "../components/tablas/interfaces/zona.interface";
import { Cliente, ClienteInit } from "./cliente";

export interface ClienteZona {
    id: number,
    codCliente: number,
    codZona: number,
    nombreAgrupacion: string,
    fechaRegistro: Date,
    Cliente: Cliente,
    Zona: Zona

}
export const ClienteZonaInit: ClienteZona = {
    id: 0,
    codCliente: 0,
    codZona: 0,
    nombreAgrupacion: '',
    fechaRegistro: new Date(),
    Cliente: ClienteInit,
    Zona: ZonaInit
};