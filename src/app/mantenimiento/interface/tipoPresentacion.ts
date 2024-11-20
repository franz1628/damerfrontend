
import { Canal, CanalInit } from "../components/tablas/interfaces/canal.interface";
import { Cliente, ClienteInit } from "./cliente";
import { TipoInformeOrden, TipoInformeOrdenInit } from "./tipoInformeOrden";

export interface TipoPresentacion {
    id: number,
    codigo :  number,
    descripcion :  string,
    descripcionResumida :  string,
    tip :  string,
    indicador :  number,
    fechaRegistro: Date,
    estado : number,
}
export const TipoPresentacionInit: TipoPresentacion = {
    id: 0,
    codigo :  0,
    descripcion :  '',
    descripcionResumida :  '',
    tip :  '',
    indicador : 0,
    fechaRegistro: new Date(),
    estado : 1,
};