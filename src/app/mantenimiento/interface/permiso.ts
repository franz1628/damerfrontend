

export interface Permiso {
    id: number,
    descripcion: string,
    estado: number,
    fechaRegistro: Date,
    fechaModificacion:string,
}
export const PermisoInit: Permiso = {
    id: 0,
    descripcion: '',
    estado: 1,
    fechaRegistro: new Date(),
    fechaModificacion: ''
};