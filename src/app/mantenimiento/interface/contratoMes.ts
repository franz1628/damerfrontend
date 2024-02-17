export interface ContratoMes {
    id: number,
    idContrato: number,
    mes: Date,
}
export const ContratoMesInit: ContratoMes = {
    id: 0,
    idContrato: 0,
    mes: new Date(),
};