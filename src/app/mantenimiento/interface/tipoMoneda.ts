
import { Canal, CanalInit } from "../components/tablas/interfaces/canal.interface";
import { Cliente, ClienteInit } from "./cliente";
import { TipoInformeOrden, TipoInformeOrdenInit } from "./tipoInformeOrden";

export interface TipoMoneda {
    id: number,
    codigo :  number,
    descripcion :  string,
    descripcionResumida :  string,
    tip :  string,
    simbolo :  string,
    alias :  string,
    fechaRegistro: Date,
    estado : number,
}
export const TipoMonedaInit: TipoMoneda = {
    id: 0,
    codigo :  0,
    descripcion :  '',
    descripcionResumida :  '',
    tip :  '',
    simbolo :  '',
    alias :  '',
    fechaRegistro: new Date(),
    estado : 1,
};