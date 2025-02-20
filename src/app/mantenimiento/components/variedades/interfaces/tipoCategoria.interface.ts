import { Canasta, CanastaInit } from "./canasta.interface";

export interface TipoCategoria {
    id: number,
    descripcion: string,
    estado: number
}

export const TipoCategoriaInit: TipoCategoria = {
    id: 0,
    descripcion: '',
    estado: 1
};
