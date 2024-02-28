import { Categoria, CategoriaInit } from "../components/variedades/interfaces/categoria.interface";
import { Sku, SkuInit } from "../components/variedades/interfaces/sku.interface";
import { Cliente, ClienteInit } from "./cliente";
import { TipoUnidadMedida, TipoUnidadMedidaInit } from "./tipoUnidadMedida";
import { UnidadMedida, UnidadMedidaInit } from "./unidadMedida";

export interface SkuAtributoTecnicoVariedadValor {
    id: number,
    idAtributoTecnicoVariedad:number,
    idSku:number,
    valor:string,
    idTipoUnidadMedida: number,
    idUnidadMedida: number,
    comentario: string,
    alias1: string,
    alias2: string,
    alias3: string,
    estado: number,
    fechaRegistro: Date,
    Sku: Sku,
    TipoUnidadMedida:TipoUnidadMedida,
    UnidadMedida:UnidadMedida

}
export const SkuAtributoTecnicoVariedadValorInit: SkuAtributoTecnicoVariedadValor = {
    id: 0,
    idAtributoTecnicoVariedad:0,
    idSku:0,
    valor:'',
    idTipoUnidadMedida: 0,
    idUnidadMedida: 0,
    comentario: '',
    alias1: '',
    alias2: '',
    alias3: '',
    estado: 0,
    fechaRegistro: new Date(),
    Sku: SkuInit,
    TipoUnidadMedida:TipoUnidadMedidaInit,
    UnidadMedida:UnidadMedidaInit
};