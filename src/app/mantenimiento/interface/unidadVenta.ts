export interface UnidadVenta {
    id: number,
    descripcion: string,
    descripcionResumida: string,
    tip: string,
    idTipoUnidadMedida:number,
    idUnidadMedida:number,
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
    descripcion: '',
    descripcionResumida: '',
    tip: '',
    idTipoUnidadMedida:0,
    idUnidadMedida:0,
    formaUso: 0,
    alias1: '',
    alias2: '',
    alias3: '',
    memo: '',
    estado: 1,
    fechaRegistro:new Date()
};

