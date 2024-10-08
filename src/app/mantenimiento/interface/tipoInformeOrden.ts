import { TipoEstudio } from "./tipoEstudio";

export interface TipoInformeOrden {
    id: number,
    codigo: number,
    descripcion: string,
    descripcionResumida: string,
    tip: string,
    claseInforme: number,
    estudios: number,
    variables: number,
    unidades: number,
    alias1: string,
    alias2: string,
    alias3: string,
    TipoEstudio:TipoEstudio[],
    fechaRegistro: Date,
    estado : number,
    fechaModificacion:string
}
export const TipoInformeOrdenInit: TipoInformeOrden = {
    id: 0,
    codigo: 0,
    descripcion: '',
    descripcionResumida: '',
    tip: '',
    claseInforme: 0,
    estudios: 0,
    variables: 0,
    unidades: 0,
    alias1: '',
    alias2: '',
    alias3: '',
    TipoEstudio:[],
    fechaRegistro: new Date(),
    estado : 1,
    fechaModificacion : ''
};