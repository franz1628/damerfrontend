import { Canal, CanalInit } from "../components/tablas/interfaces/canal.interface";
import { Distrito, DistritoInit } from "../components/tablas/ubigeo/interface/distrito.interface";

export interface Negocio {
    id:number,
    ruc: string,
    nombreComercial: string,
    nombreResumido: string,
    nombreTip: string,
    idCanal: number,
    idZona: number,
    direccion: string,
    idDistrito: number,
    idUrbanizacion: number,
    idRuta: number,
    lat: string,
    lgn: string,
    estado: number,
    entregaFactura: string,
    levantarNegocio: string,
    negocioEquivalente: string,
    telefono: string,
    fax: string,
    referencia: string,
    zonaAccidentada: string,
    zonaRiesgo: string,
    aceptaProductos: number,
    tipoHorario: number,
    idVia: number,
    numeroDomicilio: number,
    interior: string,
    manzana: string,
    lote: string,
    Distrito:Distrito,
    Canal:Canal,
    fechaRegistro: string,
    fechaModificacion: string,
}

export const NegocioInit: Negocio = {
    id:0,
    ruc: '',
    nombreComercial: '',
    nombreResumido: '',
    nombreTip: '',
    idCanal: 0,
    idZona: 0,
    direccion: '',
    idDistrito: 0,
    idUrbanizacion: 0,
    idRuta: 0,
    lat: '',
    lgn: '',
    estado: 0,
    entregaFactura: '',
    levantarNegocio: '',
    negocioEquivalente: '',
    telefono: '',
    fax: '',
    referencia: '',
    zonaAccidentada: '',
    zonaRiesgo: '',
    aceptaProductos: 0,
    tipoHorario: 0,
    idVia: 0,
    numeroDomicilio: 0,
    interior: '',
    manzana: '',
    lote: '',
    Distrito:DistritoInit,
    Canal:CanalInit,
    fechaRegistro: '',
    fechaModificacion: '',
  };

  