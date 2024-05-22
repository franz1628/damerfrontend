export interface MuestraIdeal {
    id: number,
    idCategoria: number,
    idCanal: number,
    idDistrito: number,
    valor:number,    
    estado: number,
    fechaRegistro: Date,
    
}
export const MuestraIdealInit: MuestraIdeal = {
    id: 0,
    idCategoria: 0,
    idCanal: 0,
    idDistrito: 0,
    valor:0,
    estado: 1,
    fechaRegistro: new Date(),
};