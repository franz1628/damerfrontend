export interface ContratoHistorial {
    id: number,
    idContrato: number,
    idEstadoContrato: number,
    motivo: string
}
export const ContratoHistorialInit: ContratoHistorial = {
    id: 0,
    idContrato: 0,
    idEstadoContrato: 0,
    motivo:''
};