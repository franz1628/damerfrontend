import { Categoria, CategoriaInit } from "../components/variedades/interfaces/categoria.interface";
import { CategoriaAtributoTecnico, CategoriaAtributoTecnicoInit } from "../components/variedades/interfaces/categoriaAtributoTecnico";
import { Sku, SkuInit } from "../components/variedades/interfaces/sku.interface";
import { AtributoTecnicoVariedad, AtributoTecnicoVariedadInit } from "./atributoTecnicoVariedad";
import { AtributoTecnicoVariedadValor, AtributoTecnicoVariedadValorInit } from "./atributoTecnicoVariedadValor";
import { Cliente, ClienteInit } from "./cliente";
import { TipoUnidadMedida, TipoUnidadMedidaInit } from "./tipoUnidadMedida";
import { UnidadMedida, UnidadMedidaInit } from "./unidadMedida";

export interface SkuAtributoTecnicoVariedadValor {
    id: number,
    idAtributoTecnicoVariedad:number,
    idAtributoTecnicoVariedadValor:number,
    idCategoriaAtributoTecnico:number,
    idSku:number,
    idTipoUnidadMedida: number,
    idUnidadMedida: number,
    comentario: string,
    alias1: string,
    alias2: string,
    alias3: string,
    valor: string,
    estado: number,
    fechaRegistro: Date,
    fechaModificacion: Date,
    Sku: Sku,
    TipoUnidadMedida:TipoUnidadMedida,
    UnidadMedida:UnidadMedida,
    AtributoTecnicoVariedad:AtributoTecnicoVariedad,
    CategoriaAtributoTecnico:CategoriaAtributoTecnico,
    AtributoTecnicoVariedadValor:AtributoTecnicoVariedadValor

}
export const SkuAtributoTecnicoVariedadValorInit: SkuAtributoTecnicoVariedadValor = {
    id: 0,
    idAtributoTecnicoVariedad:0,
    idAtributoTecnicoVariedadValor:0,
    idCategoriaAtributoTecnico:0,
    idSku:0,
    idTipoUnidadMedida: 0,
    idUnidadMedida: 0,
    comentario: '',
    alias1: '',
    alias2: '',
    alias3: '',
    valor:'',
    estado: 0,
    fechaRegistro: new Date(),
    fechaModificacion: new Date(),
    Sku: SkuInit,
    TipoUnidadMedida:TipoUnidadMedidaInit,
    UnidadMedida:UnidadMedidaInit,
    AtributoTecnicoVariedad:AtributoTecnicoVariedadInit,
    CategoriaAtributoTecnico:CategoriaAtributoTecnicoInit,
    AtributoTecnicoVariedadValor:AtributoTecnicoVariedadValorInit
};