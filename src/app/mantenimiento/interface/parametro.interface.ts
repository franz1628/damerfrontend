export interface Parametro {
    id: number,
    descripcion: string,
    descripcionResumida: string,
    tip: string,
    idInputClasificado: number,
    valorParametro1: number,
    valorParametro2: number,
    valorParametro3: number,
    inicioVigencia: Date,
    alias1: string,
    alias2: string,
    alias3: string,
    idEstadoRegistro: number
}

export const ParametroInit = {
    id: 0,
    descripcion: '',
    descripcionResumida: '',
    tip: '',
    idInputClasificado: 0,
    valorParametro1: 0,
    valorParametro2: 0,
    valorParametro3: 0,
    inicioVigencia: new Date(),
    alias1: '',
    alias2: '',
    alias3: '',
    idEstadoRegistro: 0
}