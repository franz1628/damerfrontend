export interface Canasta {
    id: number,
    descripcion: string,
    descripcionResumida: string,
    tip: string,
    especificarAltura: number,
    especificarAnchura: number,
    especificarProfundidad: number,
    especificarModelo: number,
    alias1: string,
    alias2: string,
    alias3: string,
    estado: number,
}

export const CanastaInit: Canasta = {
    id: 0,
    descripcion: '',
    descripcionResumida: '',
    tip: '',
    especificarAltura: 0,
    especificarAnchura: 0,
    especificarProfundidad: 0,
    especificarModelo: 0,
    alias1: '',
    alias2: '',
    alias3: '',
    estado: 1,
};
