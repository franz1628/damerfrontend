export interface UniversoNegocios {
    id: number,
    idCanal: number,
    idZona: number,
    idDistrito: number,
    valor:number,    
    estado: number,
    fechaRegistro: string,
    fechaModificacion: string,
    idMedicion:number    
}
export const UniversoNegociosInit: UniversoNegocios = {
    id: 0,
    idCanal: 0,
    idZona: 0,
    idDistrito: 0,
    estado: 1,
    valor:0,
    fechaRegistro: '',
    fechaModificacion: '',
    idMedicion:0
};