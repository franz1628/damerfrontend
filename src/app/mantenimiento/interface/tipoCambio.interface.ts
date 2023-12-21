export interface TipoCambio {
    id: number,
    idMoneda: number,
    idTipoTipoCambio: number,
    valor: number,
    fecha: Date,
    
}
export const TipoCambioInit: TipoCambio = {
    id: 0,
    idMoneda: 0,
    idTipoTipoCambio: 0,
    valor: 0,
    fecha: new Date(), 
};