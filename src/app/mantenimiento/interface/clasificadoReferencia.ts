

export interface ClasificadoReferencia {
    id: number,
    descripcion: string,
    estado: number,
    fechaRegistro: Date
}
export const ClasificadoReferenciaInit: ClasificadoReferencia = {
    id: 0,
    descripcion: '',
    estado: 1,
    fechaRegistro: new Date()
};