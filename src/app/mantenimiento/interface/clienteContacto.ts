import { Cliente, ClienteInit } from "./cliente";

export interface ClienteContacto {
    id:number,
    codCliente: number,
    nombreCompleto: string,
    cargo: number,
    correo: string,
    estado: number,
    fechaRegistro: Date,
    Cliente:Cliente
    
}
export const ClienteContactoInit: ClienteContacto = {
    id:0,
    codCliente: 0,
    nombreCompleto: '',
    cargo: 0,
    correo: '',
    estado: 1,
    fechaRegistro: new Date(),
    Cliente:ClienteInit
};