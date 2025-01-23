import { Canal, CanalInit } from "../components/tablas/interfaces/canal.interface";
import { Distrito, DistritoInit } from "../components/tablas/ubigeo/interface/distrito.interface";
import { Categoria, CategoriaInit } from "../components/variedades/interfaces/categoria.interface";

export interface MuestraIdeal {
    id: number,
    idCategoria: number,
    idCanal: number,
    idDistrito: number,
    valor:number,    
    estado: number,
    fechaRegistro: Date,
    Categoria:Categoria,    
    Canal:Canal,    
    Distrito:Distrito,    
}
export const MuestraIdealInit: MuestraIdeal = {
    id: 0,
    idCategoria: 0,
    idCanal: 0,
    idDistrito: 0,
    valor:0,
    estado: 1,
    fechaRegistro: new Date(),
    Categoria:CategoriaInit,    
    Canal:CanalInit,    
    Distrito:DistritoInit,
};