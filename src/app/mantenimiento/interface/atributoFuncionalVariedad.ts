import { Categoria, CategoriaInit } from "../components/variedades/interfaces/categoria.interface";
import { Cliente, ClienteInit } from "./cliente";
import { ClienteAgrupacionCategoria, ClienteAgrupacionCategoriaInit } from "./clienteAgrupacionCategoria";
import { TipoUnidadMedida, TipoUnidadMedidaInit } from "./tipoUnidadMedida";
import { UnidadMedida, UnidadMedidaInit } from "./unidadMedida";

export interface AtributoFuncionalVariedad {
    id: number,
    descripcion: string,
    descripcionResumida: string,
    tip: string,
    idIndiceAtributo: number,
    idTipoUnidadMedida: number,
    idUnidadMedida: number,
    alias1: string,
    alias2: string,
    alias3: string,
    idClienteAgrupacionCategoria:number,
    ClienteAgrupacionCategoria:ClienteAgrupacionCategoria
    fechaRegistro: Date,
    TipoUnidadMedida:TipoUnidadMedida,
    UnidadMedida:UnidadMedida

}
export const AtributoFuncionalVariedadInit: AtributoFuncionalVariedad = {
    id: 0,
    descripcion: '',
    descripcionResumida: '',
    tip: '',
    idIndiceAtributo: 0,
    idTipoUnidadMedida: 0,
    idUnidadMedida: 0,
    alias1: '',
    alias2: '',
    alias3: '',
    idClienteAgrupacionCategoria:0,
    fechaRegistro: new Date(),
    ClienteAgrupacionCategoria:ClienteAgrupacionCategoriaInit,
    TipoUnidadMedida:TipoUnidadMedidaInit,
    UnidadMedida:UnidadMedidaInit
};