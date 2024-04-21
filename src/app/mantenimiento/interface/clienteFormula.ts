export interface ClienteFormula {
    id: number,
    idAtributoFuncionalVariedadValor : number,
    idAtributoTecnicoVariedad : number,
    idAtributoTecnicoVariedadValors : string,

    estado: number,
    fechaRegistro?: Date|null
}
export const ClienteFormulaInit: ClienteFormula = {
    id: 0,
    idAtributoFuncionalVariedadValor : 0,
    idAtributoTecnicoVariedad : 0,
    idAtributoTecnicoVariedadValors : '',
    estado: 1,
    fechaRegistro:null
};