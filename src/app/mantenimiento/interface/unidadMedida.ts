import { TipoUnidadMedida, TipoUnidadMedidaInit } from "./tipoUnidadMedida";

export interface UnidadMedida {
    id: number,
    codigo: number,
    codTipoUnidadMedida:TipoUnidadMedida,
    descripcion: string,
    descripcionResumida: string,
    tip: string,
    unidadMetrica: number,
    factorConversion: string,
    fechaRegistro: Date,
    estado: number
}
export const UnidadMedidaInit: UnidadMedida = {
    id: 0,
    codigo: 0,
    codTipoUnidadMedida:TipoUnidadMedidaInit,
    descripcion: '',
    descripcionResumida: '',
    tip: '',
    unidadMetrica: 0,
    factorConversion: '',
    fechaRegistro: new Date(),
    estado: 1

};