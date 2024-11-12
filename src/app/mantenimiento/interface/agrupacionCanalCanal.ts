import { Canal, CanalInit } from "../components/tablas/interfaces/canal.interface";

export interface AgrupacionCanalCanal {
    id: number,
    idClienteAgrupacionCanal: number,
    idCanal: number,
    fechaRegistro:Date,
    estado:number,
    Canal:Canal
}
export const AgrupacionCanalCanalInit: AgrupacionCanalCanal = {
    id: 0,
    idClienteAgrupacionCanal: 0,
    idCanal: 0,
    fechaRegistro:new Date(),
    estado:1,
    Canal:CanalInit
};