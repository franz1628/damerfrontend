import { CategoriaAtributoTecnico } from "./categoriaAtributoTecnico"
import { TipoCategoria, TipoCategoriaInit } from "./tipoCategoria.interface"

export interface Categoria {
    id: number,
    idCanasta: number,
    idMegaCategoria: number,
    idTipoCategoria: number,
    idCategorias:string,
    descripcion: string,
    descripcionResumida: string,
    tip: string,
    alias1: string,
    alias2: string,
    alias3: string,
    estado: number,
    fechaRegistro:string,
    fechaModificacion:string,
    CategoriaAtributoTecnico:CategoriaAtributoTecnico[],
    TipoCategoria:TipoCategoria
}

export const CategoriaInit: Categoria = {
    id: 0,
    idCanasta: 0,
    idMegaCategoria: 0,
    idTipoCategoria:0,
    idCategorias:'',
    descripcion: '',
    descripcionResumida: '',
    tip: '',
    alias1: '',
    alias2: '',
    alias3: '',
    estado: 1,
    fechaRegistro:'',
    fechaModificacion:'',
    CategoriaAtributoTecnico:[],
    TipoCategoria:TipoCategoriaInit
}
