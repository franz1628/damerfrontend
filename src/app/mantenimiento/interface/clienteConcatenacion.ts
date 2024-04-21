export interface ClienteConcatenacion {
    id: number,
    idAtributoFuncionalVariedadValor : number,
    idAtributoTecnicoVariedads : string,
    variables : string,

    estado: number,
    fechaRegistro: Date
}
export const ClienteConcatenacionInit: ClienteConcatenacion = {
    id: 0,
    idAtributoFuncionalVariedadValor : 0,
    idAtributoTecnicoVariedads : '',
    variables : '',
    estado: 1,
    fechaRegistro: new Date()
};