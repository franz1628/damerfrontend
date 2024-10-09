import { Zona, ZonaInit } from "../../interfaces/zona.interface";
import { Provincia, ProvinciaInit } from "./provincia.interface";

export interface Distrito {
    id: number ,
    descripcion: string,
    idProvincia:number,
    estado: number,
    idZona:number,
    Provincia:Provincia,
    Zona:Zona
}

export const DistritoInit: Distrito = {
    id: 0 ,
    descripcion: '',
    idProvincia:0,
    estado: 1,
    idZona:0,
    Provincia:ProvinciaInit,
    Zona : ZonaInit
  };
