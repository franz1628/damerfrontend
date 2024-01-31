
export interface TipoUnidadMedida {
    id: number,
    codigo: number
    descripcion: string,
    descripcionResumida: string,
    tip: string,
    memo: string,
    fechaRegistro:Date,
    estado: number,
}
export const TipoUnidadMedidaInit: TipoUnidadMedida = {
    id: 0,
    codigo: 0,
    descripcion: '',
    descripcionResumida: '',
    tip: '',
    memo: '',
    fechaRegistro:new Date(),
    estado: 1,
    
};