export interface AtributoFuncionalVariedadValorValor {
    id: number,
    idAtributoFuncionalVariedadValor :  number,
    idAtributoTecnicoVariedadValor:number,
    estado: number,
    fechaRegistro:Date
}

export const AtributoFuncionalVariedadValorValorInit: AtributoFuncionalVariedadValorValor = {
    id: 0,
    idAtributoFuncionalVariedadValor :  0,
    idAtributoTecnicoVariedadValor:0,
    estado: 1,
    fechaRegistro:new Date()
};