import { Moneda, MonedaInit } from "./moneda";
import { TipoTipoCambio, TipoTipoCambioInit } from "./tipoTipoCambio.interface";

export interface TipoCambio {
    id: number,
    idMoneda: number,
    idTipoTipoCambio: number,
    valor: number,
    fecha: Date,
    Moneda:Moneda,
    TipoTipoCambio:TipoTipoCambio
    
}
export const TipoCambioInit: TipoCambio = {
    id: 0,
    idMoneda: 0,
    idTipoTipoCambio: 0,
    valor: 0,
    fecha: new Date(), 
    Moneda:MonedaInit,
    TipoTipoCambio:TipoTipoCambioInit
};