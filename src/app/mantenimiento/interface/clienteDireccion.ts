import { Distrito, DistritoInit } from "../components/tablas/ubigeo/interface/distrito.interface";
import { TipoDireccion, TipoDireccionInit } from "../components/variedades/interfaces/tipoDireccion";
import { Cliente, ClienteInit } from "./cliente";

export interface ClienteDireccion {
    id: number,
    idCliente: number,
    idTipoDireccion: number,
    descripcion: string,
    idDistrito: number,
    idUrbanizacion: number,
    codVia: number,
    numDomicilio: number,
    interior: number,
    manzana: string,
    lote: string,
    referencia: string,
    estado: number,
    fechaRegistro: Date,
    Cliente: Cliente,
    TipoDireccion: TipoDireccion,
    Distrito:Distrito,

}
export const ClienteDireccionInit: ClienteDireccion = {
    id: 0,
    idCliente: 0,
    idTipoDireccion: 0,
    descripcion:'',
    idDistrito: 0,
    idUrbanizacion: 0,
    codVia: 0,
    numDomicilio: 0,
    interior: 0,
    manzana: '',
    lote: '',
    referencia: '',
    estado: 1,
    fechaRegistro: new Date(),
    Cliente: ClienteInit,
    TipoDireccion: TipoDireccionInit,
    Distrito:DistritoInit
};