export interface UniversoNegocios {
    id: number,
    idCanal: number,
    idZona: number,
    valor:number,    
    estado: number,
    fechaRegistro: Date,
    
}
export const UniversoNegociosInit: UniversoNegocios = {
    id: 0,
    idCanal: 0,
    idZona: 0,
    valor:0,
    estado: 1,
    fechaRegistro: new Date(),
};