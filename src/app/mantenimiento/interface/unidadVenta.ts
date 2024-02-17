export interface UnidadVenta {
    id: number,
    codigo: number,
    descripcion: string,
    descripcionResumida: string,
    tip: string,
    formaUso: number,
    alias1: string,
    alias2: string,
    alias3: string,
    memo: string,
    estado: number,
    fechaRegistro:Date
}
export const UnidadVentaInit: UnidadVenta = {
    id: 0,
    codigo: 0,
    descripcion: '',
    descripcionResumida: '',
    tip: '',
    formaUso: 0,
    alias1: '',
    alias2: '',
    alias3: '',
    memo: '',
    estado: 1,
    fechaRegistro:new Date()
};

