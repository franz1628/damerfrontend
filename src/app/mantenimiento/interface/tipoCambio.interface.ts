import { Moneda, MonedaInit } from "./moneda";
import { TipoMoneda, TipoMonedaInit } from "./tipoMoneda";
import { TipoTipoCambio, TipoTipoCambioInit } from "./tipoTipoCambio.interface";

export interface TipoCambio {
    id: number,
    idTipoMoneda: number,
    idTipoTipoCambio: number,
    valor: number,
    fecha: Date,
    TipoMoneda:TipoMoneda,
    TipoTipoCambio:TipoTipoCambio
    
}
export const TipoCambioInit: TipoCambio = {
    id: 0,
    idTipoMoneda: 0,
    idTipoTipoCambio: 0,
    valor: 0,
    fecha: new Date(), 
    TipoMoneda:TipoMonedaInit,
    TipoTipoCambio:TipoTipoCambioInit
};