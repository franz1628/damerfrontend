import { Usuario, UsuarioInit } from "../../login/interfaces/usuario";
import { Categoria, CategoriaInit } from "../components/variedades/interfaces/categoria.interface";
import { Cliente, ClienteInit } from "./cliente";
import { EstadoContrato, EstadoContratoInit } from "./estadoContrato";
import { Frecuencia, FrecuenciaInit } from "./frecuencia";

export interface Contrato {
    id: number,
    idCliente: number,
    idCategoria: number,
    fechaInicio: string,
    fechaFin: string,
    diaEntrega: number,
    idFrecuencia: number,
    shot: number,
    extension: number,
    estado: number,
    idEstadoContrato: number,
    version: number,
    fechaModificacion: string,
    fechaAprobacion: string,
    Categoria : Categoria, 
    Cliente:Cliente,
    EstadoContrato:EstadoContrato,
    Frecuencia:Frecuencia,
    idUsuario:number,
    Usuario:Usuario
    
}
export const ContratoInit: Contrato = {
    id: 0,
    idCliente: 0,
    idCategoria: 0,
    fechaInicio: '',
    fechaFin: '',
    diaEntrega: 0,
    idFrecuencia: 0,
    shot: 0,
    extension: 0,
    estado: 1,
    idEstadoContrato: 1,
    version: 1,
    fechaModificacion: '',
    fechaAprobacion: '',
    Categoria : CategoriaInit,
    Cliente:ClienteInit,
    EstadoContrato:EstadoContratoInit,
    Frecuencia:FrecuenciaInit,
    idUsuario:1,
    Usuario:UsuarioInit
};