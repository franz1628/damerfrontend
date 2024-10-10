import { Distrito, DistritoInit } from "../components/tablas/ubigeo/interface/distrito.interface";


export interface Via {
    id: number,
    idTipoVia:number,
    idDistrito:number,
    descripcion: string,
    fechaRegistro: Date,
    fechaModificacion: Date,
    estado: number,
    Distrito:Distrito
}
export const ViaInit: Via = {
    id: 0,
    idTipoVia:1,
    idDistrito:1,
    descripcion:'',
    fechaRegistro: new Date(),
    fechaModificacion: new Date(),
    estado: 1,
    Distrito: DistritoInit

};