import { AgrupacionCanalCanal } from "./agrupacionCanalCanal";

export interface ClienteAgrupacionCanal {
    id:number,
    idCliente: number,
    fechaRegistro:Date,
    estado:number,
    nombre:string,
    AgrupacionCanalCanal: AgrupacionCanalCanal[]
}
export const ClienteAgrupacionCanalInit: ClienteAgrupacionCanal = {
    id:0,
    idCliente: 0,
    fechaRegistro:new Date(),
    nombre:'',
    estado:1,
    AgrupacionCanalCanal : []
};