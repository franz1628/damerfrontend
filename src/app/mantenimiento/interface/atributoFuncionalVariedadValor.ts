export interface AtributoFuncionalVariedadValor {
    id: number,
    idAtributoFuncionalVariedad :  number,
    descripcion :  string,
    alerta : number,
    idTipoAtributoFuncionalVariedadValor : number,
    condicion : string,
    formula : string,
    nSkus : number,
    estado: number,
    fechaRegistro:Date
}

export const AtributoFuncionalVariedadValorInit: AtributoFuncionalVariedadValor = {
    id: 0,
    idAtributoFuncionalVariedad :  0,
    descripcion :  '',
    alerta : 0,
    idTipoAtributoFuncionalVariedadValor : 0,
    condicion : '',
    formula : '',
    nSkus : 0,
    estado: 1,
    fechaRegistro:new Date()
};