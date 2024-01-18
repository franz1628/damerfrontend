export interface Frecuencia {
    id: number,
    descripcion: string,
    estado: number,
    fechaRegistro: Date,
    
}
export const FrecuenciaInit: Frecuencia = {
    id: 0,
    descripcion: '',
    estado: 1,
    fechaRegistro: new Date(),
};