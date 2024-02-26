import { Categoria, CategoriaInit } from "../components/variedades/interfaces/categoria.interface";
import { Cliente, ClienteInit } from "./cliente";

export interface AtributoFuncionalVariedad {
    id: number,
    idCliente: number,
    idCategoria: number,
    descripcion: string,
    descripcionResumida: string,
    tip: string,
    idIndiceAtributo: number,
    idTipoUnidadMedida: number,
    idUnidadMedida: number,
    alias1: string,
    alias2: string,
    alias3: string,
    
    fechaRegistro: Date,
    Cliente: Cliente,
    Categoria: Categoria

}
export const AtributoFuncionalVariedadInit: AtributoFuncionalVariedad = {
    id: 0,
    idCliente: 0,
    idCategoria: 0,
    descripcion: '',
    descripcionResumida: '',
    tip: '',
    idIndiceAtributo: 0,
    idTipoUnidadMedida: 0,
    idUnidadMedida: 0,
    alias1: '',
    alias2: '',
    alias3: '',
    fechaRegistro: new Date(),
    Cliente: ClienteInit,
    Categoria: CategoriaInit
};