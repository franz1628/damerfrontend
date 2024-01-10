export interface AtributoTecnicoNegocio {
    id: number,
    idPais: number,
    codigo: number,
    descripcion: string,
    descripcionResumida: string,
    tip: string,
    posiblesValores: number,
    idInputClasificado: number,
    alias1: string,
    alias2: string,
    alias3: string,
    estado: number,
    fechaRegistro: Date

}
export const AtributoTecnicoNegocioInit: AtributoTecnicoNegocio = {
    id: 0,
    idPais: 0,
    codigo: 0,
    descripcion: '',
    descripcionResumida: '',
    tip: '',
    posiblesValores: 0,
    idInputClasificado: 0,
    alias1: '',
    alias2: '',
    alias3: '',
    estado: 1,
    fechaRegistro: new Date()
};