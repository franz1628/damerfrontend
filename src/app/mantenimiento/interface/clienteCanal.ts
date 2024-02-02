
import { Canal, CanalInit } from "../components/tablas/interfaces/canal.interface";
import { Cliente, ClienteInit } from "./cliente";

export interface ClienteCanal {
    id: number,
    idCliente: number,
    idCanal: number,
    nombreAgrupacion: string,
    fechaRegistro: Date,
    Cliente: Cliente,
    Canal: Canal

}
export const ClienteCanalInit: ClienteCanal = {
    id: 0,
    idCliente: 0,
    idCanal: 0,
    nombreAgrupacion: '',
    fechaRegistro: new Date(),
    Cliente: ClienteInit,
    Canal: CanalInit
};