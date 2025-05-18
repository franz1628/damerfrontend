

export interface Cargo {
    id: number,
    descripcion: string,
    estado: number,
    fechaRegistro: Date,
    fechaModificacion:string,
}
export const CargoInit: Cargo = {
    id: 0,
    descripcion: '',
    estado: 1,
    fechaRegistro: new Date(),
    fechaModificacion: ''
};