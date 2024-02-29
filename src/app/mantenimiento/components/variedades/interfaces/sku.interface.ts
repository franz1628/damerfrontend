import { Canasta, CanastaInit } from "./canasta.interface";
import { Categoria, CategoriaInit } from "./categoria.interface";
import { MegaCategoria, MegaCategoriaInit } from "./megaCategoria.interface";

export interface Sku {
    id: number,
    idCanasta: number,
    idMegaCategoria: number,
    idCategoria: number,
    descripcion: string,
    descripcionResumida: string,
    tip: string,
    alias1: string,
    alias2: string,
    alias3: string,
    estado: number,
    Canasta:Canasta,
    MegaCategoria:MegaCategoria,
    Categoria:Categoria
}

export const SkuInit: Sku = {
    id: 0,
    idCanasta: 0,
    idMegaCategoria: 0,
    idCategoria: 0,
    descripcion: '',
    descripcionResumida: '',
    tip: '',
    alias1: '',
    alias2: '',
    alias3: '',
    estado: 1,
    Canasta:CanastaInit,
    MegaCategoria:MegaCategoriaInit,
    Categoria:CategoriaInit
};
