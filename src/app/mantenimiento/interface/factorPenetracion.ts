export interface FactorPenetracion {
    id: number,
    idZona: number,
    idCanal: number,
    idCategoria: number,
    valor:number,    
    estado: number,
    fechaRegistro: Date,
    
}
export const FactorPenetracionInit: FactorPenetracion = {
    id: 0,
    idZona: 0,
    idCanal: 0,
    idCategoria: 0,
    valor:0,    
    estado: 1,
    fechaRegistro:new Date(),
};