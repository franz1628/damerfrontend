export interface ContratoDetalle {
    id: number,
    idContrato: number,
    idTipoEstudio: number,
    idAgrupacionZona: number,
    idAgrupacionCanal: number,
    idTipoInforme: number,
    idAtributoFuncionalVariedad: number,
    valor: number,
    estado: number,
    
}
export const ContratoDetalleInit: ContratoDetalle = {
    id: 0,
    idContrato: 0,
    idTipoEstudio: 0,
    idAgrupacionZona: 0,
    idAgrupacionCanal: 0,
    idTipoInforme: 0,
    idAtributoFuncionalVariedad: 0,
    valor: 0,
    estado: 1,
};