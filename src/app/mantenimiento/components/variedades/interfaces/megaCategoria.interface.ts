export interface MegaCategoria {
    id: number,
    idCanasta: number,
    descripcion: string,
    descripcionResumida: string,
    tip: string,
    alias1: string,
    alias2: string,
    alias3: string,
    estado: number,
}

export const MegaCategoriaInit: MegaCategoria = {
    id: 0,
    idCanasta:0,
    descripcion: '',
    descripcionResumida: '',
    tip: '',
    alias1: '',
    alias2: '',
    alias3: '',
    estado: 1,
};
