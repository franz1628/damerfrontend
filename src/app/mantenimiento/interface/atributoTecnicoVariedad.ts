import { AtributoTecnicoVariedadValor } from "./atributoTecnicoVariedadValor";

export interface AtributoTecnicoVariedad {
    id: number,
    idPais: number,
    descripcion: string,
    descripcionResumida: string,
    tip: string,
    posiblesValores: number,
    solicitarUnidad: number,
    variosValores: number,
    idClsificadoReferencia: number,
    alias1: string,
    alias2: string,
    alias3: string,
    estado: number,
    fechaRegistro: Date,
    AtributoTecnicoVariedadValor:AtributoTecnicoVariedadValor[],
    fechaModificacion:string

}
export const AtributoTecnicoVariedadInit: AtributoTecnicoVariedad = {
    id: 0,
    idPais: 0,
    descripcion: '',
    descripcionResumida: '',
    tip: '',
    posiblesValores: 0,
    solicitarUnidad: 0,
    variosValores: 0,
    idClsificadoReferencia: 0,
    alias1: '',
    alias2: '',
    alias3: '',
    estado: 1,
    fechaRegistro: new Date(),
    AtributoTecnicoVariedadValor:[],
    fechaModificacion:''
};