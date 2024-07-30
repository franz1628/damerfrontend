export interface TipoDireccion {
    id: number,
    descripcion: string,
    alias1: string,
    estado: number,
    fechaRegistro:Date

}

export const TipoDireccionInit: TipoDireccion = {
    id: 0,
    descripcion: '',
    alias1: '',
    estado: 1,
    fechaRegistro:new Date()
}
