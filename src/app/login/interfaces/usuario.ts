import { Cargo, CargoInit } from "../../mantenimiento/interface/cargo";
import { UsuarioVista } from "../../mantenimiento/interface/usuarioVista";

export interface Usuario {
    id: number ,
    email:string,
    password:string,
    nombres : string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    fechaRegistro:string,
    fechaModificacion:string,
    estado:number,
    idCargo:number,
    vistas: string,
    Cargo:Cargo,
    UsuarioVista: UsuarioVista[]
}

export const UsuarioInit: Usuario = {
    id: 0 ,
    email:'',
    password:'',
    nombres : '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    fechaRegistro:'',
    fechaModificacion:'',
    estado:1,
    idCargo:1,
    vistas: '',
    Cargo : CargoInit,
    UsuarioVista: []
  };
