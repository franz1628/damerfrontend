import { TipoUnidadMedida, TipoUnidadMedidaInit } from "./tipoUnidadMedida";

export interface UnidadMedida {
    id: number,
    idTipoUnidadMedida:number,
    descripcion: string,
    descripcionResumida: string,
    tip: string,
    unidadMetrica: number,
    factorConversion: string,
    fechaRegistro: Date,
    estado: number,
    TipoUnidadMedida:TipoUnidadMedida
}
export const UnidadMedidaInit: UnidadMedida = {
    id: 0,
    idTipoUnidadMedida:0,
    descripcion: '',
    descripcionResumida: '',
    tip: '',
    unidadMetrica: 0,
    factorConversion: '',
    fechaRegistro: new Date(),
    estado: 1,
    TipoUnidadMedida:TipoUnidadMedidaInit

};