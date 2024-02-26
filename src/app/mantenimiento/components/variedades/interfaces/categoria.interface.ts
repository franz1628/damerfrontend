export interface Categoria {
    id: number,
    idCanasta: number,
    idMegaCategoria: number,
    descripcion: string,
    descripcionResumida: string,
    tip: string,
    alias1: string,
    alias2: string,
    alias3: string,
    estado: number,
}

export const CategoriaInit: Categoria = {
    id: 0,
    idCanasta: 0,
    idMegaCategoria: 0,
    descripcion: '',
    descripcionResumida: '',
    tip: '',
    alias1: '',
    alias2: '',
    alias3: '',
    estado: 1,
};
