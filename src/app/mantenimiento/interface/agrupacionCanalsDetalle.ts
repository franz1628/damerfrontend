import { Canal, CanalInit } from "../components/tablas/interfaces/canal.interface";
import { AgrupacionCanals, AgrupacionCanalsInit } from "./agrupacionCanals";

export interface AgrupacionCanalsDetalle {
    id: number,
    idAgrupacionCanals:number,
    idCanal: number,
    fechaRegistro:Date,
    estado:number,
    AgrupacionCanals:AgrupacionCanals
    Canal:Canal
}
export const AgrupacionCanalsDetalleInit: AgrupacionCanalsDetalle = {
    id: 0,
    idAgrupacionCanals:0,
    idCanal:0,
    fechaRegistro:new Date(),
    estado:1,
    AgrupacionCanals:AgrupacionCanalsInit,
    Canal:CanalInit
};