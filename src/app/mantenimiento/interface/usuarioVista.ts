

export interface UsuarioVista {
    id:number,
    idUsuario:number,
    idVista:number,
    idPermiso:number,
    fechaRegistro: string,
    fechaModificacion:string,
    estado:number,
}
export const UsuarioVistaInit: UsuarioVista = {
    id: 0,
    idUsuario: 0,
    idVista: 0,
    idPermiso: 0,
    fechaRegistro: new Date().toISOString(),
    fechaModificacion: '',
    estado: 1
};