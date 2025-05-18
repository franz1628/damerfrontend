export interface Vista {
    id: number,
    codigo: string,
    descripcion: string,
    estado: number,
    fechaRegistro: Date,
}
export const VistaInit: Vista = {
    id: 0,
    codigo: '',
    descripcion: '',
    estado: 1,
    fechaRegistro: new Date(),
};