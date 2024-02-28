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
};
