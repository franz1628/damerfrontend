import { Departamento, DepartamentoInit } from "./departamento.interface";

export interface Provincia {
    id: number ,
    descripcion: string,
    idDepartamento:number,
    estado: number,
    Departamento:Departamento
}

export const ProvinciaInit: Provincia = {
    id: 0 ,
    descripcion: '',
    idDepartamento:0,
    estado: 1,
    Departamento:DepartamentoInit
  };
