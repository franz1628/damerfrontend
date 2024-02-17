export interface ContratoDetalle {
    id: number,
    idContrato: number,
    idTipoEstudio: number,
    idZona: number,
    idCanal: number,
    idTipoInforme: number,
    idAtributoFuncionalVariedad: number,
    valor: number,
    estado: number,
    
}
export const ContratoDetalleInit: ContratoDetalle = {
    id: 0,
    idContrato: 0,
    idTipoEstudio: 0,
    idZona: 0,
    idCanal: 0,
    idTipoInforme: 0,
    idAtributoFuncionalVariedad: 0,
    valor: 0,
    estado: 1,
};