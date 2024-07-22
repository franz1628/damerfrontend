import { Cliente, ClienteInit } from "./cliente";

export interface ClienteContacto {
    id:number,
    idCliente: number,
    nombreCompleto: string,
    cargo: string,
    correo: string,
    estado: number,
    fechaRegistro: Date,
    Cliente:Cliente
    
}
export const ClienteContactoInit: ClienteContacto = {
    id:0,
    idCliente: 0,
    nombreCompleto: '',
    cargo: '',
    correo: '',
    estado: 1,
    fechaRegistro: new Date(),
    Cliente:ClienteInit
};