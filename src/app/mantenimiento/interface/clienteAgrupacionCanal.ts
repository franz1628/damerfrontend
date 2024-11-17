import { AgrupacionCanalCanal } from "./agrupacionCanalCanal";
import { AgrupacionCanals, AgrupacionCanalsInit } from "./agrupacionCanals";

export interface ClienteAgrupacionCanal {
    id:number,
    idCliente: number,
    fechaRegistro:Date,
    estado:number,
    nombre:string,
    idAgrupacionCanal:number,
    AgrupacionCanals:AgrupacionCanals
}
export const ClienteAgrupacionCanalInit: ClienteAgrupacionCanal = {
    id:0,
    idCliente: 0,
    fechaRegistro:new Date(),
    nombre:'',
    estado:1,
    idAgrupacionCanal:0,
    AgrupacionCanals:AgrupacionCanalsInit
};